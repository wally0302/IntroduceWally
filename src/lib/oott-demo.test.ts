import { describe, expect, it } from "vitest";
import {
  categories,
  demoReducer,
  demoModelId,
  getTryOnAsset,
  initialDemoState,
  initialWardrobe,
  products,
  recommend,
  tryOnAssets,
  type Outfit,
} from "./oott-demo";

describe("OOTT demo data and deterministic recommendation engine", () => {
  it("starts with 12 owned items, three in each category, without products", () => {
    expect(initialWardrobe).toHaveLength(12);
    expect(initialWardrobe.every((item) => item.owned)).toBe(true);
    for (const category of categories) {
      expect(
        initialWardrobe.filter((item) => item.category === category),
      ).toHaveLength(3);
    }
    expect(products).toHaveLength(3);
    expect(products.every((item) => !item.owned)).toBe(true);
  });

  it("changes the selected outfit and reasons when the scenario changes", () => {
    const outdoor = recommend(initialWardrobe, "alishan", []);
    const meeting = recommend(initialWardrobe, "clientMeeting", []);
    expect(outdoor.itemIds).not.toEqual(meeting.itemIds);
    expect(outdoor.itemIds).toContain("outer-shell");
    expect(meeting.itemIds).toContain("outer-blazer");
    expect(outdoor.reason).toContain("阿里山");
    expect(meeting.reason).toContain("客戶開會");
    expect(outdoor.reason).not.toBe(meeting.reason);
  });

  it("never recommends excluded, non-owned, or phantom items", () => {
    const excluded = [
      "top-olive-tee",
      "bottom-khaki-chino",
      "outer-shell",
      "shoes-trail",
    ];
    const result = recommend([...initialWardrobe, ...products], "alishan", excluded);
    for (const id of excluded) expect(result.itemIds).not.toContain(id);
    expect(
      result.itemIds.every((id) =>
        initialWardrobe.some((item) => item.id === id && item.owned),
      ),
    ).toBe(true);
    expect(result.itemIds).not.toContain("product-forest-parka");
  });

  it("reports a missing category instead of inventing a replacement", () => {
    const wardrobe = initialWardrobe.filter(
      (item) => item.category !== "shoes",
    );
    const result = recommend(wardrobe, "alishan", []);
    expect(result.itemIds.some((id) => id.startsWith("shoes-"))).toBe(false);
    expect(result.missingCategories).toEqual(["shoes"]);
    expect(result.reason).toContain("鞋子");
  });

  it("does not use a same-category item when it has no meaningful scenario style", () => {
    const minimalOnlyTop = {
      id: "top-minimal-only",
      name: "極簡白上衣",
      enName: "Minimal White Top",
      category: "top" as const,
      colors: ["白色"],
      styles: ["minimal"],
      thickness: "thin" as const,
      owned: true,
    };
    const result = recommend([minimalOnlyTop], "alishan", []);
    expect(result.itemIds).toEqual([]);
    expect(result.missingCategories).toEqual([
      "top",
      "bottom",
      "outer",
      "shoes",
    ]);
    expect(result.reason).toContain("戶外");
  });

  it("explains the selected item with Chinese attributes and changes the reason when another item changes", () => {
    const wardrobeWithoutTops = initialWardrobe.filter(
      (item) => item.category !== "top",
    );
    const first = recommend(wardrobeWithoutTops, "alishan", []);
    const second = recommend(wardrobeWithoutTops, "alishan", [
      "bottom-khaki-chino",
    ]);
    expect(first.reasons["outer-shell"]).toContain("輕量防潑水外套");
    expect(first.reasons["outer-shell"]).toContain("防潑水");
    expect(first.reasons["outer-shell"]).toContain("阿里山");
    expect(second.reason).not.toBe(first.reason);
  });

  it("returns independent recommendation snapshots", () => {
    const first = recommend(initialWardrobe, "alishan", []);
    first.itemIds.pop();
    first.reasons["changed"] = "changed";
    const second = recommend(initialWardrobe, "alishan", []);
    expect(second.itemIds).toHaveLength(4);
    expect(second).toEqual(recommend(initialWardrobe, "alishan", []));
    expect(second.reasons).not.toHaveProperty("changed");
  });
});

describe("OOTT demo reducer", () => {
  it("preserves shared wardrobe while switching routes and resets cleanly", () => {
    const initial = initialDemoState();
    const styled = demoReducer(initial, { type: "ROUTE", route: "styling" });
    const tryOn = demoReducer(styled, { type: "ROUTE", route: "tryOn" });
    expect(tryOn.wardrobe).toEqual(initial.wardrobe);
    expect(tryOn.route).toBe("tryOn");
    const changed = demoReducer(tryOn, {
      type: "ADD",
      id: "extra-sand-overshirt",
    });
    const reset = demoReducer(changed, { type: "RESET" });
    expect(reset).toEqual(initial);
  });

  it("adds a fixture item once and rejects unknown or duplicate additions", () => {
    const state = initialDemoState();
    const added = demoReducer(state, {
      type: "ADD",
      id: "extra-sand-overshirt",
    });
    expect(added.wardrobe).toHaveLength(13);
    expect(
      demoReducer(added, { type: "ADD", id: "extra-sand-overshirt" }).wardrobe,
    ).toHaveLength(13);
    expect(
      demoReducer(state, { type: "ADD", id: "does-not-exist" }).wardrobe,
    ).toHaveLength(12);
  });

  it("stores only valid plans tied to the current owned wardrobe and supports move/remove", () => {
    const state = initialDemoState();
    const outfit = recommend(state.wardrobe, state.scenario, []);
    const planned = demoReducer(state, { type: "PLAN", day: "週一", outfit });
    expect(planned.plan["週一"]).toEqual(outfit);
    const otherOutfit = recommend(state.wardrobe, "clientMeeting", []);
    const withTwoPlans = demoReducer(planned, {
      type: "PLAN",
      day: "週三",
      outfit: otherOutfit,
    });
    const moved = demoReducer(withTwoPlans, {
      type: "MOVE_PLAN",
      from: "週一",
      to: "週三",
    });
    expect(moved.plan["週一"]).toEqual(otherOutfit);
    expect(moved.plan["週三"]).toEqual(outfit);
    const removed = demoReducer(moved, { type: "REMOVE_PLAN", day: "週三" });
    expect(removed.plan["週三"]).toBeNull();

    const invalid: Outfit = { ...outfit, itemIds: ["phantom-item"] };
    expect(
      demoReducer(state, { type: "PLAN", day: "週一", outfit: invalid }).plan[
        "週一"
      ],
    ).toBeNull();
    const partial: Outfit = { ...outfit, itemIds: outfit.itemIds.slice(0, 3) };
    expect(
      demoReducer(state, { type: "PLAN", day: "週一", outfit: partial }).plan[
        "週一"
      ],
    ).toBeNull();
    const duplicateCategory: Outfit = {
      ...outfit,
      itemIds: [
        "top-olive-tee",
        "top-white-oxford",
        "bottom-khaki-chino",
        "outer-shell",
      ],
    };
    expect(
      demoReducer(state, {
        type: "PLAN",
        day: "週一",
        outfit: duplicateCategory,
      }).plan["週一"],
    ).toBeNull();
    expect(
      demoReducer(state, { type: "PLAN", day: "tomorrow", outfit }).plan[
        "tomorrow"
      ],
    ).toBeUndefined();
  });

  it("applies strict exclusions, clears them, selects products, and ignores malformed actions", () => {
    const state = initialDemoState();
    const excluded = demoReducer(state, {
      type: "EXCLUDE",
      id: "top-olive-tee",
    });
    expect(excluded.excludedIds).toEqual(["top-olive-tee"]);
    expect(
      demoReducer(excluded, { type: "CLEAR_EXCLUSIONS" }).excludedIds,
    ).toEqual([]);
    const selected = demoReducer(state, {
      type: "PRODUCT",
      id: products[0].id,
    });
    expect(selected.tryOnItemId).toBe(products[0].id);
    expect(
      demoReducer(state, { type: "PRODUCT", id: "wardrobe-item" }).tryOnItemId,
    ).toBeNull();
    expect(demoReducer(state, { type: "NOT_A_REAL_ACTION" } as never)).toEqual(
      state,
    );
  });

  it("does not mutate state snapshots or claim unavailable try-on assets", () => {
    const state = initialDemoState();
    const next = demoReducer(state, {
      type: "SCENARIO",
      scenario: "clientMeeting",
    });
    expect(state.scenario).toBe("alishan");
    next.wardrobe[0].styles.push("mutated");
    expect(state.wardrobe[0].styles).not.toContain("mutated");
    expect(tryOnAssets).toEqual([]);
    expect(getTryOnAsset(demoModelId, products[0].id)).toBeNull();
  });
});
