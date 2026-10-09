# OOTT asset manifest

This manifest covers the visual assets used by the portfolio case study and its deterministic demo. The inline garments are original interface artwork. They represent catalog records in the mock wardrobe; they are not photographs, not real products, and not virtual try-on output.

| Asset | Path | Usage | License / source | Alt text | `isDemo` |
| --- | --- | --- | --- | --- | --- |
| Garment illustration component | `src/components/OottGarment.tsx` | Inline flatlay illustrations for owned wardrobe items and demo product cards; `top`, `bottom`, `outer`, and `shoes` silhouettes | Original code-native SVG authored for this portfolio; no external asset or library | Prop supplied by the caller, e.g. `米白短袖上衣` | `true` |
| Try-on model, before | **Missing asset** | Shared reference image for the try-on path | Must be supplied as a licensed model image with documented provenance and model consent | `示範模特兒正面全身照（試穿前）` | `true` |
| Try-on model, after: item 01 | **Missing asset** | Paired after image for the Forest Green Parka (`product-forest-parka`) | Must use the same licensed model, same view, and a clothing-specific after image; provenance and model consent required | `同一示範模特兒穿著示範商品一的正面全身照` | `true` |
| Try-on model, after: item 02 | **Missing asset** | Paired after image for the Relaxed Blue Shirt (`product-blue-shirt`) | Must use the same licensed model, same view, and a clothing-specific after image; provenance and model consent required | `同一示範模特兒穿著示範商品二的正面全身照` | `true` |
| Try-on model, after: item 03 | **Missing asset** | Paired after image for the Burgundy Knit Top (`product-burgundy-knit`) | Must use the same licensed model, same view, and a clothing-specific after image; provenance and model consent required | `同一示範模特兒穿著示範商品三的正面全身照` | `true` |

## Media gate for the prototype

The try-on flow may expose garment selection and the preview state, but it must keep the result in an honest “素材待補齊” state for each product until its licensed before/after pair exists. A shared before image plus three clothing-specific after images would enable all products; one valid pair is enough to enable that product alone. Do not create a before/after comparison from unrelated images, generate a replacement person, or describe a placeholder as an AI result.

Before these assets are added, record for each image the source URL or provider, license terms, model release or consent record, usage scope, and the model identifier used to pair before and after files. The manifest does not grant a license and does not imply that the missing imagery exists.
