import type { Category, Item } from "../lib/oott-demo";

/** The four wardrobe categories used by the portfolio prototype. */
export type OottCategory = Category;

export const categories: Category[] = ["top", "bottom", "outer", "shoes"];

export const categoryLabels: Record<Category, string> = {
  top: "上衣",
  bottom: "下身",
  outer: "外套",
  shoes: "鞋子",
};

export const scenarioLabels: Record<"alishan" | "clientMeeting", string> = {
  alishan: "明天去阿里山走走",
  clientMeeting: "跟客戶開會",
};

/**
 * A small, fictional wardrobe for the portfolio demo. It intentionally has
 * three different options in each category so that changing a scenario or
 * excluding an item produces an observable, explainable result.
 */
export const initialWardrobe: Item[] = [
  {
    id: "top-olive-tee",
    name: "橄欖綠機能 T 恤",
    enName: "Olive Utility Tee",
    category: "top",
    colors: ["橄欖綠"],
    styles: ["outdoor", "utility", "casual"],
    thickness: "thin",
    owned: true,
  },
  {
    id: "top-navy-knit",
    name: "深藍針織上衣",
    enName: "Navy Knit Pullover",
    category: "top",
    colors: ["深藍"],
    styles: ["smart-casual", "minimal", "warm"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "top-white-oxford",
    name: "白色 Oxford 襯衫",
    enName: "White Oxford Shirt",
    category: "top",
    colors: ["白色"],
    styles: ["business", "polished", "minimal"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "bottom-khaki-chino",
    name: "卡其直筒長褲",
    enName: "Khaki Straight Chinos",
    category: "bottom",
    colors: ["卡其"],
    styles: ["outdoor", "utility", "smart-casual"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "bottom-denim",
    name: "深色丹寧褲",
    enName: "Dark Denim Jeans",
    category: "bottom",
    colors: ["靛藍"],
    styles: ["casual", "outdoor", "smart-casual"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "bottom-black-trouser",
    name: "黑色俐落西裝褲",
    enName: "Black Tailored Trousers",
    category: "bottom",
    colors: ["黑色"],
    styles: ["business", "polished", "minimal"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "outer-shell",
    name: "輕量防潑水外套",
    enName: "Lightweight Shell Jacket",
    category: "outer",
    colors: ["炭灰"],
    styles: ["outdoor", "utility", "rainproof"],
    thickness: "thin",
    owned: true,
  },
  {
    id: "outer-fleece",
    name: "米白刷毛外套",
    enName: "Oatmeal Fleece Jacket",
    category: "outer",
    colors: ["米白"],
    styles: ["outdoor", "warm", "casual"],
    thickness: "thick",
    owned: true,
  },
  {
    id: "outer-blazer",
    name: "深灰輕西裝外套",
    enName: "Charcoal Soft Blazer",
    category: "outer",
    colors: ["深灰"],
    styles: ["business", "polished", "smart-casual"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "shoes-trail",
    name: "灰色健行鞋",
    enName: "Grey Trail Sneakers",
    category: "shoes",
    colors: ["灰色"],
    styles: ["outdoor", "utility", "comfortable"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "shoes-sneaker",
    name: "白色休閒球鞋",
    enName: "White Everyday Sneakers",
    category: "shoes",
    colors: ["白色"],
    styles: ["casual", "smart-casual", "minimal"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "shoes-loafer",
    name: "黑色樂福鞋",
    enName: "Black Leather Loafers",
    category: "shoes",
    colors: ["黑色"],
    styles: ["business", "polished", "minimal"],
    thickness: "thin",
    owned: true,
  },
];

/** Pre-tagged additions used by the “add a demo item” interaction. */
export const extraItems: Item[] = [
  {
    id: "extra-sand-overshirt",
    name: "沙色工裝襯衫",
    enName: "Sand Overshirt",
    category: "top",
    colors: ["沙色"],
    styles: ["outdoor", "utility", "smart-casual"],
    thickness: "medium",
    owned: true,
  },
  {
    id: "extra-black-windbreaker",
    name: "黑色輕量風衣",
    enName: "Black Windbreaker",
    category: "outer",
    colors: ["黑色"],
    styles: ["outdoor", "rainproof", "minimal"],
    thickness: "thin",
    owned: true,
  },
  {
    id: "extra-brown-derby",
    name: "棕色德比鞋",
    enName: "Brown Derby Shoes",
    category: "shoes",
    colors: ["棕色"],
    styles: ["business", "polished", "smart-casual"],
    thickness: "thin",
    owned: true,
  },
];

/** Products are deliberately separate from the owned wardrobe. */
export const products: Item[] = [
  {
    id: "product-forest-parka",
    name: "森林綠機能外套",
    enName: "Forest Green Parka",
    category: "outer",
    colors: ["森林綠"],
    styles: ["outdoor", "utility", "warm"],
    thickness: "thick",
    owned: false,
  },
  {
    id: "product-blue-shirt",
    name: "淺藍寬版襯衫",
    enName: "Relaxed Blue Shirt",
    category: "top",
    colors: ["淺藍"],
    styles: ["smart-casual", "minimal", "polished"],
    thickness: "thin",
    owned: false,
  },
  {
    id: "product-burgundy-knit",
    name: "酒紅針織上衣",
    enName: "Burgundy Knit Top",
    category: "top",
    colors: ["酒紅"],
    styles: ["smart-casual", "warm", "polished"],
    thickness: "medium",
    owned: false,
  },
];
