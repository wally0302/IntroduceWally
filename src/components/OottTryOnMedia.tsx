"use client";
import { useState } from "react";
import type { TryOnAsset } from "@/lib/oott-demo";

/** Mount with key={asset.id}: load/error state belongs to this exact licensed pair. */
export function OottTryOnMedia({ asset }: { asset: TryOnAsset }) {
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  return (
    <div className="ot-authorized-media">
      <span className="ot-label">預製示範素材 · 非即時生成</span>
      <div role="status" className="ot-fine">
        {failed
          ? "示範圖片無法載入，暫時無法比較。"
          : loaded.length < 2
            ? "正在載入授權示範圖片…"
            : "已載入同一模特兒的前後對照。"}
      </div>
      {failed ? (
        <button
          className="ot-button"
          onClick={() => {
            setFailed(false);
            setLoaded([]);
            setRetry(retry + 1);
          }}
        >
          重新載入素材 ↻
        </button>
      ) : (
        <div className="ot-media-pair" key={retry}>
          {[
            ["before", asset.beforeSrc, "試穿前"],
            ["after", asset.afterSrc, "預製試穿示範"],
          ].map(([id, src, label]) => (
            <figure key={id}>
              <img
                src={src}
                alt={`${label}：${asset.alt}`}
                loading="lazy"
                onLoad={() =>
                  setLoaded((previous) =>
                    previous.includes(id) ? previous : [...previous, id],
                  )
                }
                onError={() => setFailed(true)}
              />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      )}
      <p className="ot-fine">視覺示例不保證實際尺寸、布料垂墜或合身程度。</p>
    </div>
  );
}
