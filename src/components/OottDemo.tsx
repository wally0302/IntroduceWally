"use client";
import { useReducer, useRef, useState } from "react";
import type { Locale } from "@/lib/types";
import {
  categories,
  categoryLabels,
  scenarioLabels,
  extraItems,
  products,
  demoReducer,
  initialDemoState,
  recommend,
  getTryOnAsset,
  demoModelId,
  type Category,
  type Item,
  type Outfit,
  type Scenario,
} from "@/lib/oott-demo";
import { OottGarment } from "./OottGarment";
import { OottTryOnMedia } from "./OottTryOnMedia";

const colorMap: Record<string, string> = {
  橄欖綠: "#8b9375",
  深藍: "#454f61",
  白色: "#f9f7f0",
  卡其: "#c1b49a",
  靛藍: "#5b7083",
  黑色: "#3c3e40",
  炭灰: "#656969",
  米白: "#e5ddcb",
  深灰: "#75777c",
  灰色: "#9ba09c",
  沙色: "#ccb99b",
  棕色: "#997655",
  森林綠: "#5c7564",
  淺藍: "#a9c0cd",
  酒紅: "#94626d",
};
const thicknessLabels = { thin: "輕薄", medium: "適中", thick: "保暖" };
const styleLabels: Record<string, string> = {
  outdoor: "戶外",
  utility: "機能",
  casual: "休閒",
  "smart-casual": "休閒商務",
  minimal: "簡約",
  warm: "保暖",
  business: "商務",
  polished: "俐落",
  rainproof: "防潑水",
  comfortable: "舒適",
};
function Garment({ item }: { item: Item }) {
  return (
    <OottGarment
      category={item.category}
      color={colorMap[item.colors[0]] || "#c8c4b8"}
      name={item.name}
      variant={item.id}
    />
  );
}

export function OottDemo({ locale }: { locale: Locale }) {
  const [state, dispatch] = useReducer(
    demoReducer,
    undefined,
    initialDemoState,
  );
  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState<Category | "all">("all");
  const [adding, setAdding] = useState(false);
  const [detail, setDetail] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [day, setDay] = useState("週一");
  const [viewPlan, setViewPlan] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const outfit = recommend(state.wardrobe, state.scenario, state.excludedIds);
  const selected = products.find((item) => item.id === state.tryOnItemId);
  const asset = selected ? getTryOnAsset(demoModelId, selected.id) : null;
  const detailItem = state.wardrobe.find((item) => item.id === detail);
  const savedPlan = viewPlan ? state.plan[viewPlan] : null;
  const focusStage = () =>
    requestAnimationFrame(() => heading.current?.focus());
  const navigate = (next: number) => {
    setStep(next);
    setNotice("");
    focusStage();
  };
  const chooseRoute = (route: "styling" | "tryOn", quick = false) => {
    dispatch({ type: "ROUTE", route });
    setStep(quick ? 2 : 0);
    setNotice("");
    setPreview(quick && route === "tryOn");
    if (quick && route === "tryOn" && !state.tryOnItemId)
      dispatch({ type: "PRODUCT", id: products[0].id });
    focusStage();
  };
  const reset = () => {
    dispatch({ type: "RESET" });
    setStep(0);
    setFilter("all");
    setAdding(false);
    setDetail(null);
    setDay("週一");
    setViewPlan(null);
    setPreview(false);
    setNotice("已恢復 12 件示範衣物；排除、選品與週計畫已清空。");
    focusStage();
  };
  const renderOutfit = (value: Outfit, editable = true) => (
    <div className="ot-outfit-grid">
      {categories.map((category) => {
        const item = state.wardrobe.find(
          (candidate) =>
            candidate.category === category &&
            value.itemIds.includes(candidate.id),
        );
        return (
          <article key={category} className="ot-outfit-item">
            <span className="ot-label">{categoryLabels[category]}</span>
            {item ? (
              <>
                <div className="ot-outfit-art">
                  <Garment item={item} />
                </div>
                <h4>{item.name}</h4>
                <p>{value.reasons[item.id]}</p>
                {editable && (
                  <button
                    className="ot-link"
                    onClick={() => {
                      dispatch({ type: "EXCLUDE", id: item.id });
                      setNotice(`已排除「${item.name}」，以同類別重新選擇。`);
                    }}
                  >
                    換掉這件<span aria-hidden="true"> ↻</span>
                  </button>
                )}
              </>
            ) : (
              <div className="ot-empty">
                <span>—</span>
                <p>目前衣櫃沒有其他符合條件的{categoryLabels[category]}。</p>
                <button
                  className="ot-link"
                  onClick={() => {
                    dispatch({ type: "CLEAR_EXCLUSIONS" });
                    setNotice("已取消排除，恢復所有衣物候選。");
                  }}
                >
                  取消排除
                </button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );

  return (
    <section
      id="interactive-demo"
      className="oott-demo"
      aria-label="OOTT 互動原型"
      lang="zh-Hant"
    >
      <header className="ot-topbar">
        <span className="micro">TRY THE PRODUCT / 60–90 SEC</span>
        <button className="ot-link" onClick={reset}>
          重新體驗 ↻
        </button>
      </header>
      <div className="ot-brandbar">
        <span className="ot-wordmark">
          OOTT<span>YOUR WARDROBE. YOUR POSSIBILITIES.</span>
        </span>
        <span className="ot-demo-badge">DEMO</span>
      </div>
      <div className="ot-disclosure">
        模擬衣櫃 / 預設情境 / 非即時 AI 生成
        {locale === "en" && (
          <span> · Traditional Chinese product walkthrough</span>
        )}
      </div>
      {state.route && (
        <div className="ot-routebar">
          <div className="ot-route-tabs" aria-label="切換問題">
            <button
              aria-pressed={state.route === "styling"}
              onClick={() => chooseRoute("styling")}
            >
              A / 今天穿什麼
            </button>
            <button
              aria-pressed={state.route === "tryOn"}
              onClick={() => chooseRoute("tryOn")}
            >
              B / 新衣適合嗎
            </button>
          </div>
          <span className="ot-inventory-count">
            我的衣櫃 · {state.wardrobe.length} 件
          </span>
        </div>
      )}
      <div className="ot-status" role="status" aria-live="polite">
        {notice}
      </div>
      {!state.route ? (
        <div className="ot-entry">
          <div className="ot-entry-copy">
            <span className="ot-label">LESS GUESSING. MORE YOU.</span>
            <h2 ref={heading} tabIndex={-1}>
              今天，你遇到哪個
              <br />
              穿搭問題？
            </h2>
            <p>同一套個人衣櫃，探索兩種決策場景。</p>
            <span className="ot-entry-index">
              01 — OWN IT.
              <br />
              02 — STYLE IT.
              <br />
              03 — MAKE IT YOURS.
            </span>
          </div>
          <div className="ot-entry-choices">
            <article className="ot-choice">
              <div className="ot-choice-art">
                <Garment item={state.wardrobe[0]} />
                <Garment item={state.wardrobe[3]} />
                <span>A</span>
              </div>
              <button
                className="ot-choice-button"
                onClick={() => chooseRoute("styling")}
              >
                <span>
                  <small>從已有的衣服出發</small>我不知道穿什麼
                </span>
                <span aria-hidden="true">↗</span>
              </button>
              <button
                className="ot-link"
                onClick={() => chooseRoute("styling", true)}
              >
                直接看搭配成果 →
              </button>
            </article>
            <article className="ot-choice">
              <div className="ot-choice-art ot-choice-art-light">
                <Garment item={products[1]} />
                <span>B</span>
              </div>
              <button
                className="ot-choice-button"
                onClick={() => chooseRoute("tryOn")}
              >
                <span>
                  <small>從購買前的猶豫出發</small>新衣穿起來適不適合？
                </span>
                <span aria-hidden="true">↗</span>
              </button>
              <button
                className="ot-link"
                onClick={() => chooseRoute("tryOn", true)}
              >
                直接看預覽流程 →
              </button>
            </article>
          </div>
        </div>
      ) : (
        <>
          <ol className="ot-progress">
            {(state.route === "styling"
              ? ["我的衣櫃", "選擇情境", "搭配與計畫"]
              : ["選擇商品", "預覽說明", "檢視結果"]
            ).map((label, i) => (
              <li key={label} aria-current={step === i ? "step" : undefined}>
                <button
                  disabled={state.route === "tryOn" && i > 0 && !selected}
                  onClick={() => {
                    if (state.route === "tryOn") setPreview(i === 2);
                    navigate(i);
                  }}
                >
                  <span>0{i + 1}</span>
                  {label}
                </button>
              </li>
            ))}
          </ol>
          <div className="ot-workspace">
            {state.route === "styling" && step === 0 && (
              <>
                <div className="ot-stage-heading">
                  <div>
                    <span className="ot-label">01 / YOUR STARTING POINT</span>
                    <h2 ref={heading} tabIndex={-1}>
                      先看看，你已經有什麼。
                    </h2>
                    <p>12 件示範衣物起步。點開看標籤，或加入一件試試。</p>
                  </div>
                  <button
                    className="ot-button"
                    aria-expanded={adding}
                    onClick={() => setAdding(!adding)}
                  >
                    {adding ? "收起新增單品 −" : "新增一件示範衣服 ＋"}
                  </button>
                </div>
                {adding && (
                  <div className="ot-add-panel">
                    <p>
                      示範辨識結果 · 這些標籤已預先設定，沒有執行 AI Vision。
                    </p>
                    <div>
                      {extraItems.map((item) => {
                        const added = state.wardrobe.some(
                          (candidate) => candidate.id === item.id,
                        );
                        return (
                          <button
                            key={item.id}
                            disabled={added}
                            onClick={() => {
                              dispatch({ type: "ADD", id: item.id });
                              setNotice(
                                `已加入「${item.name}」；衣櫃與推薦候選同步更新。`,
                              );
                            }}
                          >
                            <Garment item={item} />
                            <span>
                              {item.name}
                              <small>
                                {added ? "已在衣櫃 ✓" : "加入衣櫃 ＋"}
                              </small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="ot-filters" aria-label="衣物分類">
                  {(["all", ...categories] as const).map((category) => (
                    <button
                      key={category}
                      aria-pressed={filter === category}
                      onClick={() => setFilter(category)}
                    >
                      {category === "all" ? "全部" : categoryLabels[category]}{" "}
                      <span>
                        {
                          state.wardrobe.filter(
                            (item) =>
                              category === "all" || item.category === category,
                          ).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
                <div className="ot-wardrobe-grid">
                  {state.wardrobe
                    .filter(
                      (item) => filter === "all" || item.category === filter,
                    )
                    .map((item) => (
                      <button
                        key={item.id}
                        className="ot-garment-card"
                        aria-pressed={detail === item.id}
                        onClick={() =>
                          setDetail(detail === item.id ? null : item.id)
                        }
                      >
                        <div>
                          <Garment item={item} />
                        </div>
                        <span>{item.name}</span>
                        <small>
                          {categoryLabels[item.category]} / {item.colors[0]}
                        </small>
                      </button>
                    ))}
                </div>
                {detailItem && (
                  <div className="ot-item-detail">
                    <div>
                      <strong>{detailItem.name}</strong>
                      <p>
                        {categoryLabels[detailItem.category]} ·{" "}
                        {detailItem.colors.join("、")} ·{" "}
                        {detailItem.styles
                          .map((style) => styleLabels[style])
                          .join(" / ")}{" "}
                        · 厚薄：{thicknessLabels[detailItem.thickness]}
                      </p>
                      <small>示範辨識結果 · 預先設定的衣物資料</small>
                    </div>
                    <button className="ot-link" onClick={() => setDetail(null)}>
                      關閉詳情 ×
                    </button>
                  </div>
                )}
                <div className="ot-actions">
                  <span>我的衣櫃 · {state.wardrobe.length} 件</span>
                  <button className="ot-primary" onClick={() => navigate(1)}>
                    用這個衣櫃選搭配 →
                  </button>
                </div>
              </>
            )}
            {state.route === "styling" && step === 1 && (
              <>
                <div className="ot-stage-heading">
                  <div>
                    <span className="ot-label">
                      02 / CONTEXT MAKES A DIFFERENCE
                    </span>
                    <h2 ref={heading} tabIndex={-1}>
                      一樣的衣櫃，不一樣的一天。
                    </h2>
                    <p>選擇預設情境，衣物選擇會跟著改變。</p>
                  </div>
                </div>
                <div className="ot-scenarios">
                  {(["alishan", "clientMeeting"] as Scenario[]).map(
                    (scenario, i) => (
                      <button
                        key={scenario}
                        aria-pressed={state.scenario === scenario}
                        onClick={() => dispatch({ type: "SCENARIO", scenario })}
                      >
                        <span className="ot-scenario-number">0{i + 1}</span>
                        <div className="ot-scenario-art" aria-hidden="true">
                          {i === 0 ? (
                            <svg viewBox="0 0 300 100">
                              <path d="M5 95 90 10l60 60 40-35 105 60M60 40l30-30 30 30" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 300 100">
                              <path d="M50 95V20h100v75m0-60h95v60M70 40h15m20 0h15M70 60h15m20 0h15m-50 20h15m20 0h15m50-25h15m15 0h15m-45 20h15m15 0h15" />
                            </svg>
                          )}
                        </div>
                        <h3>{scenarioLabels[scenario]}</h3>
                        <p>
                          {i === 0
                            ? "戶外、舒適、可調整的層次"
                            : "商務、俐落、不過度正式"}
                        </p>
                        <small>
                          {i === 0
                            ? "示範天氣條件：偏涼／可能下雨"
                            : "示範場合條件：室內會議／日常通勤"}
                        </small>
                        <span className="ot-scenario-selection">
                          {state.scenario === scenario
                            ? "已選擇 ✓"
                            : "選這個情境 →"}
                        </span>
                      </button>
                    ),
                  )}
                </div>
                <div className="ot-actions">
                  <button className="ot-link" onClick={() => navigate(0)}>
                    ← 返回衣櫃
                  </button>
                  <button className="ot-primary" onClick={() => navigate(2)}>
                    看看今天可以怎麼穿 →
                  </button>
                </div>
              </>
            )}
            {state.route === "styling" && step === 2 && (
              <>
                <div className="ot-stage-heading">
                  <div>
                    <span className="ot-label">03 / ALREADY YOURS</span>
                    <h2 ref={heading} tabIndex={-1}>
                      從你的衣櫃，找到今天的答案。
                    </h2>
                    <p>示範規則推薦；原始產品使用 Gemini + 向量檢索。</p>
                  </div>
                  <label className="ot-select-label">
                    切換情境
                    <select
                      aria-label="切換推薦情境"
                      value={state.scenario}
                      onChange={(event) => {
                        dispatch({
                          type: "SCENARIO",
                          scenario: event.target.value as Scenario,
                        });
                        setNotice(
                          "已依新情境重新選擇；先前排除的單品仍不會出現。",
                        );
                      }}
                    >
                      {Object.entries(scenarioLabels).map(([value, label]) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="ot-recommend-summary">
                  <span>理解情境 → 篩選衣櫃 → 形成搭配</span>
                  <p>
                    {state.scenario === "alishan"
                      ? "示範條件：偏涼、可能下雨；優先戶外活動與可調整的層次。"
                      : "示範條件：客戶會議；優先俐落單品與日常移動的彈性。"}
                  </p>
                </div>
                {renderOutfit(outfit)}
                {state.excludedIds.length > 0 && (
                  <div className="ot-exclusions">
                    <span>
                      已排除 {state.excludedIds.length} 件：
                      {state.wardrobe
                        .filter((item) => state.excludedIds.includes(item.id))
                        .map((item) => item.name)
                        .join("、")}
                    </span>
                    <button
                      className="ot-link"
                      onClick={() => {
                        dispatch({ type: "CLEAR_EXCLUSIONS" });
                        setNotice("已取消所有排除。");
                      }}
                    >
                      取消所有排除
                    </button>
                  </div>
                )}
                <section className="ot-planner" aria-label="本週穿搭計畫">
                  <div className="ot-stage-heading">
                    <div>
                      <span className="ot-label">
                        MAKE IT PART OF YOUR WEEK
                      </span>
                      <h3>不只看過，也為這週留一套。</h3>
                    </div>
                    <div className="ot-plan-controls">
                      <label className="sr-only" htmlFor="ot-plan-day">
                        安排星期
                      </label>
                      <select
                        id="ot-plan-day"
                        value={day}
                        onChange={(event) => setDay(event.target.value)}
                      >
                        {Object.keys(state.plan).map((value) => (
                          <option key={value}>{value}</option>
                        ))}
                      </select>
                      <button
                        className="ot-primary"
                        disabled={outfit.missingCategories.length > 0}
                        onClick={() => {
                          dispatch({ type: "PLAN", day, outfit });
                          setViewPlan(day);
                          setNotice(
                            `已將目前搭配${state.plan[day] ? "更新至" : "加入"}${day}。`,
                          );
                        }}
                      >
                        {state.plan[day]
                          ? "更新這天的搭配"
                          : "加入這週穿搭計畫"}{" "}
                        ＋
                      </button>
                    </div>
                  </div>
                  <p className="ot-fine">
                    {outfit.missingCategories.length > 0
                      ? "先取消排除或新增合適衣物，湊齊四類單品才能加入計畫。"
                      : "儲存實際衣物組合；修改推薦不會改寫已存計畫。此處的星期為示範安排。"}
                  </p>
                  <div className="ot-week">
                    {Object.entries(state.plan).map(([value, plan]) => (
                      <button
                        key={value}
                        aria-pressed={viewPlan === value}
                        onClick={() => {
                          setViewPlan(value);
                          setDay(value);
                        }}
                      >
                        <span>{value}</span>
                        {plan ? (
                          <>
                            <strong>
                              {plan.scenario === "alishan"
                                ? "山裡走走"
                                : "客戶會議"}
                            </strong>
                            <small>{plan.itemIds.length} 件單品</small>
                          </>
                        ) : (
                          <span className="ot-week-empty">
                            ＋<small>尚未安排</small>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  {viewPlan && (
                    <div className="ot-saved-plan">
                      <div className="ot-stage-heading">
                        <h4>
                          {viewPlan} ·{" "}
                          {savedPlan
                            ? scenarioLabels[savedPlan.scenario]
                            : "尚未安排穿搭"}
                        </h4>
                        <button
                          className="ot-link"
                          onClick={() => setViewPlan(null)}
                        >
                          收起 ×
                        </button>
                      </div>
                      {savedPlan ? (
                        <>
                          <div className="ot-plan-items">
                            {savedPlan.itemIds.map((id) => {
                              const item = state.wardrobe.find(
                                (candidate) => candidate.id === id,
                              )!;
                              return (
                                <div key={id}>
                                  <Garment item={item} />
                                  <span>{item.name}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="ot-plan-controls">
                            <label>
                              移動日期（已有計畫則交換）
                              <select
                                aria-label="移動穿搭日期"
                                value={viewPlan}
                                onChange={(event) => {
                                  const to = event.target.value;
                                  dispatch({
                                    type: "MOVE_PLAN",
                                    from: viewPlan,
                                    to,
                                  });
                                  setViewPlan(to);
                                  setDay(to);
                                  setNotice(
                                    `搭配已移至${to}；若原有計畫，兩天已交換。`,
                                  );
                                }}
                              >
                                {Object.keys(state.plan).map((value) => (
                                  <option key={value}>{value}</option>
                                ))}
                              </select>
                            </label>
                            <button
                              className="ot-link"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_PLAN",
                                  day: viewPlan,
                                });
                                setNotice(`已移除${viewPlan}的計畫。`);
                              }}
                            >
                              移除這天搭配 ×
                            </button>
                          </div>
                        </>
                      ) : (
                        <p>選擇上方搭配，再按「加入這週穿搭計畫」。</p>
                      )}
                    </div>
                  )}
                </section>
                <div className="ot-actions">
                  <button className="ot-link" onClick={() => navigate(0)}>
                    ← 返回衣櫃
                  </button>
                  <button
                    className="ot-link"
                    onClick={() => chooseRoute("tryOn")}
                  >
                    換個問題：新衣適合嗎？ →
                  </button>
                </div>
              </>
            )}
            {state.route === "tryOn" && (
              <>
                <div className="ot-stage-heading">
                  <div>
                    <span className="ot-label">
                      {step === 0
                        ? "01 / BEFORE YOU BUY"
                        : step === 1
                          ? "02 / PREVIEW BOUNDARY"
                          : "03 / PREVIEW STATUS"}
                    </span>
                    <h2 ref={heading} tabIndex={-1}>
                      {step === 0
                        ? "喜歡這件，也想知道穿起來如何。"
                        : step === 1
                          ? "先說清楚，這個預覽能回答什麼。"
                          : asset
                            ? "看看這件衣服的預製示範。"
                            : "這件衣服的試穿素材，還沒有到位。"}
                    </h2>
                    <p>示範商品 / 非本人衣櫃 · 不涉及購買或結帳</p>
                  </div>
                </div>
                <div className="ot-tryon-layout">
                  <div className="ot-products">
                    {products.map((item) => (
                      <button
                        key={item.id}
                        aria-pressed={selected?.id === item.id}
                        onClick={() => {
                          dispatch({ type: "PRODUCT", id: item.id });
                          setNotice(
                            `已選擇「${item.name}」。${preview ? "此商品也尚缺對應授權素材。" : ""}`,
                          );
                        }}
                      >
                        <Garment item={item} />
                        <span>
                          {item.name}
                          <small>
                            {categoryLabels[item.category]} · {item.colors[0]} ·{" "}
                            {thicknessLabels[item.thickness]}
                          </small>
                        </span>
                        <span aria-hidden="true">
                          {selected?.id === item.id ? "●" : "○"}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="ot-preview">
                    {preview && asset ? (
                      <OottTryOnMedia key={asset.id} asset={asset} />
                    ) : (
                      <div
                        className="ot-model-placeholder"
                        aria-label="示意人形，非真人照片或試穿結果"
                      >
                        <svg viewBox="0 0 200 230" aria-hidden="true">
                          <circle cx="100" cy="36" r="20" />
                          <path d="M80 64 55 78 35 137l17 8 22-43-5 91h62l-5-91 22 43 17-8-20-59-25-14M80 197l-4 29m44-29 4 29" />
                          <path d="M30 12H12v25m158-25h18v25M12 183v25h20m156-25v25h-20" />
                        </svg>
                        <span>示意佔位 · 非生成結果</span>
                      </div>
                    )}
                    <div className="ot-preview-copy">
                      <span className="ot-label">
                        {selected ? selected.name : "選一件示範商品開始"}
                      </span>
                      <h3>
                        {preview
                          ? asset
                            ? "預製示範素材"
                            : "等待補齊授權素材"
                          : "想像可以被輔助，尺寸仍需確認。"}
                      </h3>
                      <p>
                        {preview && asset
                          ? `此為「${selected?.name}」與指定模特兒配對的授權預製素材，沒有即時產生新圖片。`
                          : preview
                            ? `尚缺「${selected?.name ?? "此單品"}」與同一授權模特兒、相同視角的 Before / After。此處不提供不相干照片的前後比較。`
                            : "完整試穿展示需要一張授權模特兒照片，以及這件衣服對應的預製試穿圖。視覺預覽也不能保證尺寸、布料垂墜或實際合身。"}
                      </p>
                      {step === 0 ? (
                        <button
                          className="ot-primary"
                          disabled={!selected}
                          onClick={() => navigate(1)}
                        >
                          下一步：了解預覽 →
                        </button>
                      ) : step === 1 ? (
                        <button
                          className="ot-primary"
                          onClick={() => {
                            setPreview(true);
                            navigate(2);
                            setNotice(
                              `已檢查「${selected?.name}」素材：${asset ? "顯示授權預製對照，非即時生成。" : "缺少授權前後對照，未產生試穿圖片。"}`,
                            );
                          }}
                        >
                          預覽試穿 →
                        </button>
                      ) : (
                        <button
                          className="ot-button"
                          onClick={() => {
                            setPreview(false);
                            navigate(0);
                          }}
                        >
                          返回選品 ↶
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ot-tryon-conclusion">
                  <p>
                    穿搭建議回答「怎麼搭」，虛擬試穿則探索「穿起來可能是什麼樣子」。
                  </p>
                  <a href="#oott-strategy">
                    這兩種決策，為什麼要由同一個產品解決？ ↓
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <footer className="ot-footer">
        <p>純前端示範 · 服飾為原創插畫 · 重新整理會清空本次操作</p>
        <a href="#oott-problem">這些功能為什麼要這樣安排？往下看產品決策 ↓</a>
      </footer>
    </section>
  );
}
