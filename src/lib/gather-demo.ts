import type { Locale } from './types';

export type GatherRole = 'host' | 'friend';
export type GatherScene = 'intro' | 'create' | 'room' | 'vote' | 'finalize' | 'restaurants' | 'complete';
export type Availability = 'available' | 'if_needed' | 'unavailable';
export type LocationKey = 'zhongshan' | 'taipei-station';
export type Cuisine = 'any' | 'taiwanese' | 'japanese' | 'vegetarian';
export type Budget = 400 | 600 | 800;

export interface Localized { zh: string; en: string }
export interface GatherSlot { id: string; date: string; time: string }
export interface GatherParticipant { id: string; nickname: string; availability: Record<string, Availability> }
export interface RestaurantOption {
  id: string;
  name: Localized;
  area: LocationKey;
  cuisine: Cuisine;
  priceMin: number;
  priceMax: number;
  capacity: number;
  vegetarian: boolean | null;
  longStay: boolean | null;
  accessibility: boolean | null;
}
export interface RestaurantPreferences { budget: Budget; vegetarian: boolean; longStay: boolean; cuisine: Cuisine; wheelchair: boolean }
export interface RestaurantResult extends RestaurantOption { hardMismatch: string[]; needsConfirmation: string[] }
export interface RestaurantEvaluation { eligible: RestaurantResult[]; excluded: RestaurantResult[] }
export interface Completion {
  title: string; date: string; time: string; confirmed: string[]; tentative: string[];
  confirmedCount: number; tentativeCount: number; restaurant: RestaurantResult; location: LocationKey; host: string;
}

export interface GatherState {
  scene: GatherScene;
  role: GatherRole;
  title: string;
  hostName: string;
  location: LocationKey;
  candidateDates: string[];
  slots: GatherSlot[];
  participants: GatherParticipant[];
  guestDraft: { nickname: string; availability: Record<string, Availability> };
  roomCreated: boolean;
  inviteCopied: boolean;
  finalizedSlotId: string | null;
  restaurantPreferences: RestaurantPreferences;
  selectedRestaurantId: string | null;
}

export const DEFAULT_TITLE = '好久不見的週末聚餐';
export const DEFAULT_HOST = '示範使用者';
export const DEFAULT_LOCATION: LocationKey = 'zhongshan';
export const DEFAULT_RESTAURANT_PREFERENCES: RestaurantPreferences = {
  budget: 600, vegetarian: false, longStay: true, cuisine: 'any', wheelchair: false,
};

export const restaurants: RestaurantOption[] = [
  { id: 'green-hour', name: { zh: '青禾蔬房', en: 'Green Hour' }, area: 'zhongshan', cuisine: 'vegetarian', priceMin: 420, priceMax: 560, capacity: 10, vegetarian: true, longStay: true, accessibility: null },
  { id: 'night-sail', name: { zh: '夜泊台菜', en: 'Night Sail Taiwanese' }, area: 'zhongshan', cuisine: 'taiwanese', priceMin: 480, priceMax: 580, capacity: 8, vegetarian: null, longStay: true, accessibility: true },
  { id: 'paper-lantern', name: { zh: '紙燈日和', en: 'Paper Lantern' }, area: 'zhongshan', cuisine: 'japanese', priceMin: 520, priceMax: 600, capacity: 10, vegetarian: false, longStay: null, accessibility: false },
  { id: 'alley-table', name: { zh: '巷口小食堂', en: 'Alley Table' }, area: 'zhongshan', cuisine: 'taiwanese', priceMin: 320, priceMax: 460, capacity: 6, vegetarian: false, longStay: true, accessibility: null },
  { id: 'north-gate-noodles', name: { zh: '北口麵店', en: 'North Gate Noodles' }, area: 'taipei-station', cuisine: 'taiwanese', priceMin: 160, priceMax: 240, capacity: 6, vegetarian: null, longStay: false, accessibility: true },
  { id: 'station-soba', name: { zh: '站前蕎麥室', en: 'Station Soba' }, area: 'taipei-station', cuisine: 'japanese', priceMin: 360, priceMax: 520, capacity: 10, vegetarian: true, longStay: null, accessibility: null },
  { id: 'orange-canteen', name: { zh: '橘屋食堂', en: 'Orange Canteen' }, area: 'taipei-station', cuisine: 'taiwanese', priceMin: 600, priceMax: 820, capacity: 12, vegetarian: null, longStay: true, accessibility: true },
  { id: 'small-terrace', name: { zh: '小台階', en: 'Small Terrace' }, area: 'zhongshan', cuisine: 'any', priceMin: 260, priceMax: 380, capacity: 4, vegetarian: true, longStay: false, accessibility: false },
];

const seedPeople: Array<[string, string, Availability[]]> = [
  ['amy', 'Amy', ['available', 'available', 'available']],
  ['yuki', 'Yuki', ['available', 'if_needed', 'unavailable']],
  ['jin', 'Jin', ['if_needed', 'available', 'unavailable']],
  ['sara', 'Sara', ['available', 'unavailable', 'available']],
  ['lin', 'Lin', ['unavailable', 'available', 'available']],
];

export function getTaipeiToday(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const value = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

export function addDays(date: string, amount: number): string {
  const [year, month, day] = date.split('-').map(Number);
  const result = new Date(Date.UTC(year, month - 1, day + amount));
  return result.toISOString().slice(0, 10);
}

export function futureDates(today: string = getTaipeiToday()): string[] {
  return [addDays(today, 3), addDays(today, 5), addDays(today, 7)];
}

export function buildSlots(candidateDates: string[], times: string[] = ['18:30', '19:00', '19:30']): GatherSlot[] {
  return candidateDates.map((date, dateIndex) => ({ id: `slot-${dateIndex + 1}`, date, time: times[dateIndex] ?? '18:30' }));
}

function seedParticipants(slots: GatherSlot[]): GatherParticipant[] {
  return seedPeople.map(([id, nickname, statuses]) => ({ id, nickname, availability: Object.fromEntries(slots.map((slot, index) => [slot.id, statuses[index] ?? 'unavailable'])) }));
}

export function initialState(): GatherState {
  return {
    scene: 'intro', role: 'host', title: DEFAULT_TITLE, hostName: DEFAULT_HOST, location: DEFAULT_LOCATION,
    candidateDates: [], slots: [], participants: [], guestDraft: { nickname: '', availability: {} },
    roomCreated: false, inviteCopied: false, finalizedSlotId: null, restaurantPreferences: { ...DEFAULT_RESTAURANT_PREFERENCES }, selectedRestaurantId: null,
  };
}

export const createInitialState = initialState;

export function withDates(state: GatherState, dates: string[]): GatherState {
  const times = dates.map((_, index) => state.slots[index]?.time ?? ['18:30', '19:00', '19:30'][index] ?? '18:30');
  const slots = buildSlots(dates, times);
  return { ...state, candidateDates: dates, slots, participants: seedParticipants(slots), guestDraft: { nickname: state.guestDraft.nickname, availability: Object.fromEntries(slots.map(slot => [slot.id, 'unavailable'])) } };
}

export type GatherAction =
  | { type: 'SET_SCENE'; scene: GatherScene }
  | { type: 'INIT_DATES'; dates: string[] }
  | { type: 'SET_DATES'; dates: string[] }
  | { type: 'SET_SLOT_TIME'; index: number; time: string }
  | { type: 'SET_TITLE'; title: string }
  | { type: 'SET_HOST'; hostName: string }
  | { type: 'SET_LOCATION'; location: LocationKey }
  | { type: 'CREATE_ROOM' }
  | { type: 'COPY_INVITE' }
  | { type: 'SET_ROLE'; role: GatherRole }
  | { type: 'SET_GUEST_NICKNAME'; nickname: string }
  | { type: 'SET_GUEST_AVAILABILITY'; slotId: string; availability: Availability }
  | { type: 'SUBMIT_VOTE' }
  | { type: 'FINALIZE'; slotId: string }
  | { type: 'REOPEN' }
  | { type: 'SET_RESTAURANT_PREFS'; patch: Partial<RestaurantPreferences> }
  | { type: 'SELECT_RESTAURANT'; restaurantId: string }
  | { type: 'RESET'; dates?: string[]; title?: string; hostName?: string; nickname?: string };

function invalidate(state: GatherState): GatherState {
  return { ...state, finalizedSlotId: null, selectedRestaurantId: null, scene: state.roomCreated ? 'vote' : state.scene };
}

function validFutureDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00+08:00`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value && value > getTaipeiToday();
}

export function validCandidateDates(dates: string[]): boolean {
  return dates.length === 3 && new Set(dates).size === dates.length && dates.every(validFutureDate);
}

export function gatherReducer(state: GatherState, action: GatherAction): GatherState {
  switch (action.type) {
    case 'RESET': {
      const fresh = initialState();
      const dated = action.dates ? withDates(fresh, action.dates) : fresh;
      return { ...dated, title: action.title ?? DEFAULT_TITLE, hostName: action.hostName ?? DEFAULT_HOST, guestDraft: { ...dated.guestDraft, nickname: action.nickname ?? '' } };
    }
    case 'SET_SCENE': {
      const allowed = ((action.scene === 'intro' || action.scene === 'create') && !state.roomCreated)
        || (action.scene === 'room' && state.roomCreated)
        || (action.scene === 'vote' && state.roomCreated && !state.finalizedSlotId)
        || (action.scene === 'finalize' && !!state.roomCreated && !!state.finalizedSlotId)
        || (action.scene === 'restaurants' && state.role === 'host' && !!state.roomCreated && !!state.finalizedSlotId)
        || (action.scene === 'complete' && state.role === 'host' && !!state.roomCreated && !!state.finalizedSlotId && !!state.selectedRestaurantId);
      return allowed ? { ...state, scene: action.scene } : state;
    }
    case 'INIT_DATES': return state.candidateDates.length ? state : withDates(state, action.dates);
    case 'SET_DATES': {
      if (state.scene !== 'create') return state;
      const next = withDates(state, action.dates);
      return { ...invalidate(next), roomCreated: false, scene: 'create' };
    }
    case 'SET_SLOT_TIME': {
      if (state.scene !== 'create' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(action.time)) return state;
      return { ...state, slots: state.slots.map((slot, index) => index === action.index ? { ...slot, time: action.time } : slot) };
    }
    case 'SET_TITLE': return !state.roomCreated && (state.scene === 'intro' || state.scene === 'create') ? { ...state, title: action.title } : state;
    case 'SET_HOST': return !state.roomCreated && (state.scene === 'intro' || state.scene === 'create') ? { ...state, hostName: action.hostName } : state;
    case 'SET_LOCATION': return state.scene === 'create' ? { ...state, location: action.location, finalizedSlotId: null, selectedRestaurantId: null } : state;
    case 'CREATE_ROOM': return !state.roomCreated && state.scene === 'create' && !!state.title.trim() && !!state.hostName.trim() && validCandidateDates(state.candidateDates) && state.slots.every(slot => /^([01]\d|2[0-3]):[0-5]\d$/.test(slot.time)) ? { ...state, roomCreated: true, scene: 'room' } : state;
    case 'COPY_INVITE': return { ...state, inviteCopied: true };
    case 'SET_ROLE': return { ...state, role: action.role };
    case 'SET_GUEST_NICKNAME': return ((!state.roomCreated && (state.scene === 'intro' || state.scene === 'create')) || (state.role === 'friend' && state.roomCreated && state.scene === 'vote' && !state.finalizedSlotId)) ? { ...state, guestDraft: { ...state.guestDraft, nickname: action.nickname } } : state;
    case 'SET_GUEST_AVAILABILITY': return state.role === 'friend' && state.roomCreated && state.scene === 'vote' && !state.finalizedSlotId && state.slots.some(slot => slot.id === action.slotId) ? { ...state, guestDraft: { ...state.guestDraft, availability: { ...state.guestDraft.availability, [action.slotId]: action.availability } } } : state;
    case 'SUBMIT_VOTE': {
      if (state.role !== 'friend' || !state.roomCreated || state.scene !== 'vote' || state.finalizedSlotId || !state.guestDraft.nickname.trim()) return state;
      const participant: GatherParticipant = { id: 'guest', nickname: state.guestDraft.nickname.trim(), availability: { ...state.guestDraft.availability } };
      const participants = [...state.participants.filter(item => item.id !== 'guest'), participant];
      return invalidate({ ...state, participants });
    }
    case 'FINALIZE': {
      if (state.role !== 'host' || !state.roomCreated || !state.slots.some(slot => slot.id === action.slotId) || slotStats(state, action.slotId).availableCount === 0) return state;
      return { ...state, finalizedSlotId: action.slotId, selectedRestaurantId: null, scene: 'finalize' };
    }
    case 'REOPEN': return state.role === 'host' ? { ...state, finalizedSlotId: null, selectedRestaurantId: null, scene: 'vote' } : state;
    case 'SET_RESTAURANT_PREFS': {
      if (state.role !== 'host' || !state.finalizedSlotId || !state.roomCreated || (state.scene !== 'restaurants' && state.scene !== 'complete')) return state;
      return { ...state, restaurantPreferences: { ...state.restaurantPreferences, ...action.patch }, selectedRestaurantId: null, scene: 'restaurants' };
    }
    case 'SELECT_RESTAURANT': return state.role === 'host' && state.scene === 'restaurants' && state.finalizedSlotId && restaurantResults(state).some(item => item.id === action.restaurantId) ? { ...state, selectedRestaurantId: action.restaurantId, scene: 'complete' } : state;
  }
}

export interface SlotStats { slot: GatherSlot; availableCount: number; tentativeCount: number; unavailableCount: number; score: number; availableNames: string[]; tentativeNames: string[] }
export function slotStats(state: Pick<GatherState, 'participants' | 'slots'>, slotId: string): SlotStats {
  const slot = state.slots.find(item => item.id === slotId) ?? { id: slotId, date: '', time: '' };
  const lists: Record<Availability, string[]> = { available: [], if_needed: [], unavailable: [] };
  state.participants.forEach(person => lists[person.availability[slotId] ?? 'unavailable'].push(person.nickname));
  return { slot, availableCount: lists.available.length, tentativeCount: lists.if_needed.length, unavailableCount: lists.unavailable.length, score: lists.available.length * 2 + lists.if_needed.length, availableNames: lists.available, tentativeNames: lists.if_needed };
}

export function rankSlots(state: Pick<GatherState, 'participants' | 'slots'>): SlotStats[] {
  return state.slots.map(slot => slotStats(state, slot.id)).sort((a, b) => b.score - a.score || b.availableCount - a.availableCount || a.slot.id.localeCompare(b.slot.id));
}

export function finalizedAttendees(state: Pick<GatherState, 'participants' | 'finalizedSlotId' | 'slots'>): { confirmed: string[]; tentative: string[] } {
  if (!state.finalizedSlotId) return { confirmed: [], tentative: [] };
  const stats = slotStats(state, state.finalizedSlotId);
  return { confirmed: stats.availableNames, tentative: stats.tentativeNames };
}

export function evaluateRestaurants(preferences: RestaurantPreferences, area: LocationKey = 'zhongshan', partySize = 0): RestaurantEvaluation {
  const evaluated = restaurants.filter(item => item.area === area).map(item => {
    const hardMismatch: string[] = [];
    const needsConfirmation: string[] = [];
    if (item.priceMax > preferences.budget) hardMismatch.push('budget');
    if (item.capacity < partySize) hardMismatch.push('capacity');
    if (preferences.cuisine !== 'any' && item.cuisine !== preferences.cuisine) hardMismatch.push('cuisine');
    if (preferences.vegetarian && item.vegetarian === false) hardMismatch.push('vegetarian');
    if (preferences.longStay && item.longStay === false) hardMismatch.push('longStay');
    if (preferences.wheelchair && item.accessibility === false) hardMismatch.push('accessibility');
    if (preferences.vegetarian && item.vegetarian === null) needsConfirmation.push('vegetarian');
    if (preferences.longStay && item.longStay === null) needsConfirmation.push('longStay');
    if (preferences.wheelchair && item.accessibility === null) needsConfirmation.push('accessibility');
    return { ...item, hardMismatch, needsConfirmation };
  });
  const order = (a: RestaurantResult, b: RestaurantResult) => a.needsConfirmation.length - b.needsConfirmation.length || a.priceMin - b.priceMin || a.id.localeCompare(b.id);
  return {
    eligible: evaluated.filter(item => item.hardMismatch.length === 0).sort(order),
    excluded: evaluated.filter(item => item.hardMismatch.length > 0).sort((a, b) => a.hardMismatch.length - b.hardMismatch.length || a.id.localeCompare(b.id)),
  };
}

function filterRestaurants(preferences: RestaurantPreferences, area: LocationKey = 'zhongshan', partySize = 0): RestaurantResult[] {
  return evaluateRestaurants(preferences, area, partySize).eligible;
}

export function restaurantResults(preferences: RestaurantPreferences, area?: LocationKey, partySize?: number): RestaurantResult[];
export function restaurantResults(state: Pick<GatherState, 'restaurantPreferences' | 'location' | 'participants' | 'finalizedSlotId' | 'slots'>): RestaurantResult[];
export function restaurantResults(input: RestaurantPreferences | Pick<GatherState, 'restaurantPreferences' | 'location' | 'participants' | 'finalizedSlotId' | 'slots'>, area: LocationKey = 'zhongshan', partySize = 0): RestaurantResult[] {
  if ('restaurantPreferences' in input) {
    const state = input;
    const count = state.finalizedSlotId ? slotStats({ participants: state.participants, slots: state.slots }, state.finalizedSlotId).availableCount : state.participants.length;
    return filterRestaurants(state.restaurantPreferences, state.location, count);
  }
  return filterRestaurants(input, area, partySize);
}

export function selectedCompletion(state: GatherState): Completion | null {
  if (!state.finalizedSlotId || !state.selectedRestaurantId) return null;
  const slot = state.slots.find(item => item.id === state.finalizedSlotId);
  const restaurant = restaurantResults(state).find(item => item.id === state.selectedRestaurantId);
  if (!slot || !restaurant) return null;
  const attendees = finalizedAttendees(state);
  return { title: state.title, date: slot.date, time: slot.time, confirmed: attendees.confirmed, tentative: attendees.tentative, confirmedCount: attendees.confirmed.length, tentativeCount: attendees.tentative.length, restaurant, location: state.location, host: state.hostName };
}

export function inviteText(state: GatherState, locale: Locale): string {
  return locale === 'zh' ? `【Demo】${state.hostName} 邀請你加入「${state.title}」的時間投票。\n這是互動示範，不會建立真實房間、訂位或傳送訊息。` : `[Demo] ${state.hostName} invited you to vote on “${state.title}”.\nThis is an interactive demo: no real room, booking, or message will be created.`;
}

export function completionText(completion: Completion, locale: Locale): string {
  const confirmed = completion.confirmed.join(locale === 'zh' ? '、' : ', ');
  const tentative = completion.tentative.join(locale === 'zh' ? '、' : ', ') || (locale === 'zh' ? '無' : 'None');
  const area = completion.location === 'zhongshan' ? (locale === 'zh' ? '台北・中山站' : 'Zhongshan, Taipei') : (locale === 'zh' ? '台北・台北車站' : 'Taipei Main Station');
  const labels: Record<string, [string, string]> = { vegetarian: ['素食選項', 'vegetarian options'], longStay: ['久坐限制', 'seating time limit'], accessibility: ['輪椅友善設施', 'wheelchair access'] };
  const unknown = completion.restaurant.needsConfirmation.map(key => labels[key]?.[locale === 'zh' ? 0 : 1] ?? key).join(locale === 'zh' ? '、' : ', ');
  const caveat = unknown ? (locale === 'zh' ? `\n待確認：${unknown}` : `\nTo confirm: ${unknown}`) : '';
  return locale === 'zh' ? `【Demo】${completion.title}\n日期：${completion.date} ${completion.time}\n區域：${area}\n主揪：${completion.host}\n確定 ${completion.confirmedCount} 人：${confirmed || '無'}\n可能 ${completion.tentativeCount} 人：${tentative}\n餐廳：${completion.restaurant.name.zh}${caveat}\n這是示範通知，沒有訂位或傳送訊息。` : `[Demo] ${completion.title}\nDate: ${completion.date} ${completion.time}\nArea: ${area}\nHost: ${completion.host}\nConfirmed (${completion.confirmedCount}): ${confirmed || 'None'}\nTentative (${completion.tentativeCount}): ${tentative}\nRestaurant: ${completion.restaurant.name.en}${caveat}\nDemo notification only. No booking or message was sent.`;
}
