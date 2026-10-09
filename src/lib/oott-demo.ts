import {
  categories,
  categoryLabels,
  extraItems,
  initialWardrobe,
  products,
  scenarioLabels,
} from "../data/oott-demo";

export type Category = "top" | "bottom" | "outer" | "shoes";
export type Scenario = "alishan" | "clientMeeting";
export type Thickness = "thin" | "medium" | "thick";

export interface Item {
  id: string;
  name: string;
  enName: string;
  category: Category;
  colors: string[];
  styles: string[];
  thickness: Thickness;
  owned: boolean;
}

export interface Outfit {
  itemIds: string[];
  scenario: Scenario;
  reason: string;
  reasons: Record<string, string>;
  missingCategories: Category[];
}

export type Route = "styling" | "tryOn" | null;

export interface DemoState {
  route: Route;
  wardrobe: Item[];
  excludedIds: string[];
  scenario: Scenario;
  plan: Record<string, Outfit | null>;
  tryOnItemId: string | null;
}

export type DemoAction =
  | { type: "RESET" }
  | { type: "ROUTE"; route: Route }
  | { type: "ADD"; id: string }
  | { type: "SCENARIO"; scenario: Scenario }
  | { type: "EXCLUDE"; id: string }
  | { type: "CLEAR_EXCLUSIONS" }
  | { type: "PLAN"; day: string; outfit: Outfit | null }
  | { type: "MOVE_PLAN"; from: string; to: string }
  | { type: "REMOVE_PLAN"; day: string }
  | { type: "PRODUCT"; id: string };

export {
  categories,
  categoryLabels,
  scenarioLabels,
  extraItems,
  initialWardrobe,
  products,
};

type ScenarioRule = {
  styles: string[];
  eligibleStyles: string[];
  thickness: Thickness[];
  label: string;
  setting: string;
};

const scenarioRules: Record<Scenario, ScenarioRule> = {
  alishan: {
    styles: [
      "outdoor",
      "utility",
      "comfortable",
      "rainproof",
      "warm",
      "casual",
    ],
    eligibleStyles: ["outdoor", "utility", "comfortable", "rainproof", "warm"],
    thickness: ["medium", "thick", "thin"],
    label: scenarioLabels.alishan,
    setting: "偏涼、可能遇到變化天氣",
  },
  clientMeeting: {
    styles: ["business", "polished", "smart-casual", "minimal"],
    eligibleStyles: ["business", "polished", "smart-casual"],
    thickness: ["medium", "thin", "thick"],
    label: scenarioLabels.clientMeeting,
    setting: "需要俐落、方便移動的商務場合",
  },
};

const categoryOrder: Category[] = ["top", "bottom", "outer", "shoes"];
const styleLabels: Record<string, string> = {
  outdoor: "戶外",
  utility: "機能",
  comfortable: "舒適",
  rainproof: "防潑水",
  warm: "保暖",
  business: "商務",
  polished: "俐落",
  "smart-casual": "休閒商務",
  casual: "休閒",
  minimal: "極簡",
};

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && (categories as string[]).includes(value);
}

function isScenario(value: unknown): value is Scenario {
  return value === "alishan" || value === "clientMeeting";
}

function cloneItem(item: Item): Item {
  return { ...item, colors: [...item.colors], styles: [...item.styles] };
}

function cloneOutfit(outfit: Outfit): Outfit {
  return {
    itemIds: [...outfit.itemIds],
    scenario: outfit.scenario,
    reason: outfit.reason,
    reasons: { ...outfit.reasons },
    missingCategories: [...outfit.missingCategories],
  };
}

function cloneState(state: DemoState): DemoState {
  const plan: Record<string, Outfit | null> = {};
  for (const [day, outfit] of Object.entries(state.plan))
    plan[day] = outfit ? cloneOutfit(outfit) : null;
  return {
    route: state.route,
    wardrobe: state.wardrobe.map(cloneItem),
    excludedIds: [...state.excludedIds],
    scenario: state.scenario,
    plan,
    tryOnItemId: state.tryOnItemId,
  };
}

function rankItem(item: Item, scenario: Scenario): number {
  const rule = scenarioRules[scenario];
  const styleScore = item.styles.reduce((score, style) => {
    const index = rule.styles.indexOf(style);
    return score + (index === -1 ? 0 : rule.styles.length - index);
  }, 0);
  const thicknessScore =
    rule.thickness.indexOf(item.thickness) === 0
      ? 3
      : rule.thickness.indexOf(item.thickness) === 1
        ? 2
        : 1;
  return styleScore * 10 + thicknessScore;
}

function reasonFor(item: Item, scenario: Scenario): string {
  const rule = scenarioRules[scenario];
  const matchingStyle = rule.eligibleStyles.find((style) =>
    item.styles.includes(style),
  );
  const thickness =
    item.thickness === "thick"
      ? "保暖度較高"
      : item.thickness === "thin"
        ? "輕量好調整"
        : "厚薄適中";
  const style = matchingStyle
    ? `符合「${styleLabels[matchingStyle] ?? matchingStyle}」風格`
    : "保留搭配彈性";
  const color =
    item.colors.length > 0 ? `色系為${item.colors.join("／")}` : "色系未設定";
  return `${item.name}（${categoryLabels[item.category]}）${style}，${color}、${thickness}，適合${rule.label}。`;
}

function isEligibleForScenario(item: Item, scenario: Scenario): boolean {
  return scenarioRules[scenario].eligibleStyles.some((style) =>
    item.styles.includes(style),
  );
}

/**
 * Deterministic, explainable portfolio rules. This is deliberately not an AI
 * call: every result must be reproducible and traceable to the demo wardrobe.
 */
export function recommend(
  wardrobe: Item[],
  scenario: Scenario,
  excludedIds: string[] = [],
): Outfit {
  const safeScenario: Scenario = isScenario(scenario) ? scenario : "alishan";
  const rule = scenarioRules[safeScenario];
  const excluded = new Set(excludedIds.filter((id) => typeof id === "string"));
  const selected: string[] = [];
  const reasons: Record<string, string> = {};
  const missingCategories: Category[] = [];

  for (const category of categoryOrder) {
    const candidates = wardrobe
      .filter(
        (item) =>
          item.owned &&
          item.category === category &&
          !excluded.has(item.id) &&
          isEligibleForScenario(item, safeScenario),
      )
      .slice()
      .sort(
        (a, b) =>
          rankItem(b, safeScenario) - rankItem(a, safeScenario) ||
          a.id.localeCompare(b.id),
      );
    const winner = candidates[0];
    if (!winner) {
      missingCategories.push(category);
      continue;
    }
    selected.push(winner.id);
    reasons[winner.id] = reasonFor(winner, safeScenario);
  }

  const selectedText =
    selected.length > 0 ? selected.map((id) => reasons[id]).join("；") : "";
  const missingText =
    missingCategories.length === 0
      ? ""
      : `目前衣櫃沒有符合${rule.label}所需「${missingCategories.map((category) => categoryLabels[category]).join("、")}」的單品（需要${rule.eligibleStyles.map((style) => styleLabels[style] ?? style).join("、")}風格）。`;
  const reason = `${rule.label}（${rule.setting}）：${[selectedText, missingText].filter(Boolean).join("；")}`;

  return {
    itemIds: selected,
    scenario: safeScenario,
    reason,
    reasons,
    missingCategories,
  };
}

const defaultPlan: Record<string, Outfit | null> = {
  週一: null,
  週二: null,
  週三: null,
  週四: null,
  週五: null,
  週六: null,
  週日: null,
};

const planDays = Object.keys(defaultPlan);

export function initialDemoState(): DemoState {
  return {
    route: null,
    wardrobe: initialWardrobe.map(cloneItem),
    excludedIds: [],
    scenario: "alishan",
    plan: Object.fromEntries(
      Object.keys(defaultPlan).map((day) => [day, null]),
    ),
    tryOnItemId: null,
  };
}

function isValidOutfit(outfit: unknown, wardrobe: Item[]): outfit is Outfit {
  if (!outfit || typeof outfit !== "object") return false;
  const candidate = outfit as Partial<Outfit>;
  if (
    !isScenario(candidate.scenario) ||
    typeof candidate.reason !== "string" ||
    candidate.reason.trim().length === 0 ||
    !Array.isArray(candidate.itemIds)
  )
    return false;
  if (
    candidate.itemIds.length !== categoryOrder.length ||
    !candidate.itemIds.every((id) => typeof id === "string")
  )
    return false;
  if (new Set(candidate.itemIds).size !== categoryOrder.length) return false;
  if (
    !Array.isArray(candidate.missingCategories) ||
    candidate.missingCategories.length !== 0 ||
    !candidate.missingCategories.every(isCategory)
  )
    return false;
  if (
    !candidate.reasons ||
    typeof candidate.reasons !== "object" ||
    Array.isArray(candidate.reasons)
  )
    return false;
  const items = candidate.itemIds.map((id) =>
    wardrobe.find((item) => item.id === id && item.owned),
  );
  if (items.some((item) => !item)) return false;
  const itemCategories = items.map((item) => item!.category);
  if (
    new Set(itemCategories).size !== categoryOrder.length ||
    !categoryOrder.every((category) => itemCategories.includes(category))
  )
    return false;
  return candidate.itemIds.every(
    (id) =>
      typeof candidate.reasons?.[id] === "string" &&
      candidate.reasons[id].trim().length > 0,
  );
}

function validDay(day: unknown): day is string {
  return typeof day === "string" && planDays.includes(day);
}

/** Reducer used by the client-side demo; all returned nested data is copied. */
export function demoReducer(
  state: DemoState,
  action: DemoAction | unknown,
): DemoState {
  if (!state || typeof state !== "object") return initialDemoState();
  if (
    !action ||
    typeof action !== "object" ||
    typeof (action as { type?: unknown }).type !== "string"
  )
    return cloneState(state);
  const input = action as Record<string, unknown>;

  switch (input.type) {
    case "RESET":
      return initialDemoState();
    case "ROUTE":
      return input.route === null ||
        input.route === "styling" ||
        input.route === "tryOn"
        ? { ...cloneState(state), route: input.route }
        : cloneState(state);
    case "ADD": {
      if (
        typeof input.id !== "string" ||
        state.wardrobe.some((item) => item.id === input.id)
      )
        return cloneState(state);
      const item = extraItems.find((candidate) => candidate.id === input.id);
      if (!item) return cloneState(state);
      const next = cloneState(state);
      next.wardrobe.push(cloneItem(item));
      next.excludedIds = next.excludedIds.filter((id) => id !== item.id);
      return next;
    }
    case "SCENARIO":
      return isScenario(input.scenario)
        ? { ...cloneState(state), scenario: input.scenario }
        : cloneState(state);
    case "EXCLUDE": {
      if (
        typeof input.id !== "string" ||
        !state.wardrobe.some((item) => item.id === input.id && item.owned)
      )
        return cloneState(state);
      const next = cloneState(state);
      if (!next.excludedIds.includes(input.id)) next.excludedIds.push(input.id);
      return next;
    }
    case "CLEAR_EXCLUSIONS":
      return { ...cloneState(state), excludedIds: [] };
    case "PLAN": {
      if (
        !validDay(input.day) ||
        (input.outfit !== null && !isValidOutfit(input.outfit, state.wardrobe))
      )
        return cloneState(state);
      const next = cloneState(state);
      next.plan[input.day] =
        input.outfit === null ? null : cloneOutfit(input.outfit);
      return next;
    }
    case "MOVE_PLAN": {
      if (
        !validDay(input.from) ||
        !validDay(input.to) ||
        input.from === input.to ||
        !(input.from in state.plan) ||
        !(input.to in state.plan)
      )
        return cloneState(state);
      const next = cloneState(state);
      const sourcePlan = next.plan[input.from];
      next.plan[input.from] = next.plan[input.to];
      next.plan[input.to] = sourcePlan;
      return next;
    }
    case "REMOVE_PLAN": {
      if (!validDay(input.day) || !(input.day in state.plan))
        return cloneState(state);
      const next = cloneState(state);
      next.plan[input.day] = null;
      return next;
    }
    case "PRODUCT":
      return typeof input.id === "string" &&
        products.some((product) => product.id === input.id)
        ? { ...cloneState(state), tryOnItemId: input.id }
        : cloneState(state);
    default:
      return cloneState(state);
  }
}

export interface TryOnAsset {
  id: string;
  modelId: string;
  itemId: string;
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}

/** No authorised, same-model before/after images were supplied for the demo. */
export const tryOnAssets: TryOnAsset[] = [];
export const demoModelId = "demo-model";

export function getTryOnAsset(
  modelId: string,
  itemId: string,
): TryOnAsset | null {
  return (
    tryOnAssets.find(
      (asset) => asset.modelId === modelId && asset.itemId === itemId,
    ) ?? null
  );
}
