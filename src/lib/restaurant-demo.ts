export interface RestaurantPreferences {
  budget: 400 | 600 | 800;
  partySize: 4 | 6 | 10;
  vegetarian: boolean;
  longStay: boolean;
}

export interface Restaurant {
  id: string;
  name: { zh: string; en: string };
  cuisine: { zh: string; en: string };
  price: number;
  capacity: number;
  vegetarian: boolean;
  longStay: boolean;
  walkMinutes: number;
  note: { zh: string; en: string };
}

export const defaultPreferences: RestaurantPreferences = {
  budget: 600,
  partySize: 6,
  vegetarian: false,
  longStay: true,
};

// Fictional Zhongshan-area examples for the portfolio demo. These are not real venues.
export const restaurants: Restaurant[] = [
  {
    id: 'alley-table',
    name: { zh: '巷口小食堂', en: 'Alley Table' },
    cuisine: { zh: '家常料理', en: 'Home-style' },
    price: 380,
    capacity: 6,
    vegetarian: false,
    longStay: true,
    walkMinutes: 5,
    note: { zh: '6 人已達示範桌型上限，需先確認同桌座位。', en: 'Six people fill this demo table; confirm seating together.' },
  },
  {
    id: 'green-hour',
    name: { zh: '青禾蔬房', en: 'Green Hour' },
    cuisine: { zh: '蔬食', en: 'Vegetarian' },
    price: 520,
    capacity: 10,
    vegetarian: true,
    longStay: true,
    walkMinutes: 9,
    note: { zh: '需再確認蛋奶素／全素需求，以及同桌座位。', en: 'Confirm vegan versus lacto-ovo needs and seating together.' },
  },
  {
    id: 'harbor-pot',
    name: { zh: '海風鍋物', en: 'Harbor Pot' },
    cuisine: { zh: '火鍋', en: 'Hot pot' },
    price: 680,
    capacity: 10,
    vegetarian: false,
    longStay: true,
    walkMinutes: 7,
    note: { zh: '需確認低消、服務費與大型桌位是否可預約。', en: 'Check minimum spend, service charges and large-table availability.' },
  },
  {
    id: 'daylight-curry',
    name: { zh: '拾光咖哩', en: 'Daylight Curry' },
    cuisine: { zh: '咖哩', en: 'Curry' },
    price: 300,
    capacity: 4,
    vegetarian: false,
    longStay: false,
    walkMinutes: 4,
    note: { zh: '示範用餐限時 60 分鐘，需確認是否適合聚會。', en: 'A demo 60-minute dining limit; check whether it suits your gathering.' },
  },
  {
    id: 'night-sail',
    name: { zh: '夜泊茶飯', en: 'Night Sail' },
    cuisine: { zh: '台式料理', en: 'Taiwanese' },
    price: 580,
    capacity: 8,
    vegetarian: false,
    longStay: true,
    walkMinutes: 7,
    note: { zh: '每人估價接近 NT$600，需確認服務費是否另計。', en: 'Close to NT$600 per person; check whether service charges are extra.' },
  },
  {
    id: 'north-gate-noodles',
    name: { zh: '北口麵店', en: 'North Gate Noodles' },
    cuisine: { zh: '麵食', en: 'Noodles' },
    price: 180,
    capacity: 6,
    vegetarian: false,
    longStay: false,
    walkMinutes: 3,
    note: { zh: '示範用餐限時 45 分鐘，大桌需提前確認。', en: 'A demo 45-minute dining limit; confirm large-table seating ahead.' },
  },
];

export interface RestaurantRecommendations {
  matches: Restaurant[];
  eligibleCount: number;
  totalCount: number;
  excludedCount: number;
}

export function recommendRestaurants(preferences: RestaurantPreferences): RestaurantRecommendations {
  const eligible = restaurants
    .filter(restaurant => restaurant.price <= preferences.budget)
    .filter(restaurant => restaurant.capacity >= preferences.partySize)
    .filter(restaurant => !preferences.vegetarian || restaurant.vegetarian)
    .filter(restaurant => !preferences.longStay || restaurant.longStay)
    .slice()
    .sort((a, b) => a.walkMinutes - b.walkMinutes || a.price - b.price || a.id.localeCompare(b.id));

  return {
    matches: eligible.slice(0, 3).map(restaurant => ({
      ...restaurant,
      name: { ...restaurant.name },
      cuisine: { ...restaurant.cuisine },
      note: { ...restaurant.note },
    })),
    eligibleCount: eligible.length,
    totalCount: restaurants.length,
    excludedCount: restaurants.length - eligible.length,
  };
}
