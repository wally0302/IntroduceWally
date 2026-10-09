import { describe, expect, it } from 'vitest';
import {
  addDays, buildSlots, completionText, evaluateRestaurants, finalizedAttendees, futureDates, gatherReducer, initialState, rankSlots,
  restaurantResults, selectedCompletion, slotStats, validCandidateDates, withDates,
} from './gather-demo';

describe('gather demo state engine', () => {
  it('builds three future dates from an explicit Taipei date without mutating the input', () => {
    const dates = futureDates('2026-10-09');
    expect(dates).toEqual(['2026-10-12', '2026-10-14', '2026-10-16']);
    expect(dates.every(date => date > '2026-10-09')).toBe(true);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('reset seeds fresh dates in the reset action so a room can be created immediately', () => {
    const dates = futureDates();
    let state = gatherReducer(initialState(), { type: 'RESET', dates, title: 'Dinner', hostName: 'Host', nickname: 'You' });
    expect(state.candidateDates).toEqual(dates);
    expect(state.guestDraft.nickname).toBe('You');
    state = gatherReducer(state, { type: 'SET_SCENE', scene: 'create' });
    state = gatherReducer(state, { type: 'CREATE_ROOM' });
    expect(state.roomCreated).toBe(true);
    expect(state.scene).toBe('room');
  });

  it('rejects empty, malformed, duplicate, and past dates while date edits preserve times', () => {
    const dates = futureDates();
    expect(validCandidateDates([])).toBe(false);
    expect(validCandidateDates(['2026-02-30', dates[1], dates[2]])).toBe(false);
    expect(validCandidateDates([dates[0], dates[0], dates[2]])).toBe(false);
    expect(validCandidateDates(['2020-01-01', dates[1], dates[2]])).toBe(false);
    let state = withDates(initialState(), dates);
    state = { ...state, scene: 'create' };
    state = gatherReducer(state, { type: 'SET_SLOT_TIME', index: 1, time: '21:15' });
    state = gatherReducer(state, { type: 'SET_DATES', dates: [dates[0], dates[1], dates[2]] });
    expect(state.slots.map(slot => slot.time)).toEqual(['18:30', '21:15', '19:30']);
    expect(gatherReducer(state, { type: 'CREATE_ROOM' }).roomCreated).toBe(true);
  });

  it('seeds the five friends and keeps candidates as stable slots', () => {
    const state = withDates(initialState(), ['2026-10-12', '2026-10-14', '2026-10-16']);
    expect(state.participants).toHaveLength(5);
    expect(state.slots).toEqual(buildSlots(state.candidateDates));
    expect(slotStats(state, 'slot-1')).toMatchObject({ availableCount: 3, tentativeCount: 1, score: 7 });
  });

  it('upserts the guest response under one id and immediately changes ranking', () => {
    let state = withDates(initialState(), futureDates('2026-10-09'));
    state = gatherReducer({ ...state, roomCreated: true, scene: 'vote', role: 'friend' }, { type: 'SET_GUEST_NICKNAME', nickname: 'Amy' });
    state = gatherReducer(state, { type: 'SET_GUEST_AVAILABILITY', slotId: 'slot-3', availability: 'available' });
    state = gatherReducer(state, { type: 'SUBMIT_VOTE' });
    expect(state.participants.filter(person => person.id === 'guest')).toHaveLength(1);
    expect(rankSlots(state)[0].slot.id).toBe('slot-3');
    state = gatherReducer({ ...state, scene: 'vote', role: 'friend' }, { type: 'SET_GUEST_NICKNAME', nickname: 'Amy updated' });
    state = gatherReducer(state, { type: 'SUBMIT_VOTE' });
    expect(state.participants).toHaveLength(6);
    expect(state.participants.find(person => person.id === 'guest')?.nickname).toBe('Amy updated');
  });

  it('only host can finalize an arbitrary slot, and zero available is rejected', () => {
    let state = withDates(initialState(), futureDates('2026-10-09'));
    state = { ...state, roomCreated: true, scene: 'vote' };
    expect(gatherReducer({ ...state, role: 'friend' }, { type: 'FINALIZE', slotId: 'slot-2' }).finalizedSlotId).toBeNull();
    expect(gatherReducer(state, { type: 'FINALIZE', slotId: 'slot-1' }).finalizedSlotId).toBe('slot-1');
    const none = { ...state, participants: state.participants.map(person => ({ ...person, availability: { 'slot-1': 'unavailable' as const } })) };
    expect(gatherReducer(none, { type: 'FINALIZE', slotId: 'slot-1' }).finalizedSlotId).toBeNull();
  });

  it('locks vote edits after finalization and requires a friend in a created voting room to submit', () => {
    let state = withDates(initialState(), futureDates());
    expect(gatherReducer(state, { type: 'SUBMIT_VOTE' })).toBe(state);
    state = { ...state, roomCreated: true, scene: 'vote' };
    expect(gatherReducer(state, { type: 'SUBMIT_VOTE' })).toBe(state);
    state = { ...state, role: 'friend', guestDraft: { nickname: 'Amy', availability: { 'slot-1': 'available' } } };
    const voted = gatherReducer(state, { type: 'SUBMIT_VOTE' });
    expect(voted.participants).toHaveLength(6);
    const locked = { ...voted, role: 'host' as const, finalizedSlotId: 'slot-1', scene: 'finalize' as const };
    expect(gatherReducer(locked, { type: 'SET_SCENE', scene: 'vote' })).toBe(locked);
    expect(gatherReducer({ ...locked, role: 'friend' }, { type: 'SET_GUEST_AVAILABILITY', slotId: 'slot-2', availability: 'available' })).toMatchObject({ participants: locked.participants });
  });

  it('guards scene transitions and invalidates all downstream state after upstream date changes', () => {
    const fresh = withDates(initialState(), futureDates());
    expect(gatherReducer(fresh, { type: 'SET_SCENE', scene: 'restaurants' })).toBe(fresh);
    const stale = { ...fresh, scene: 'create' as const, roomCreated: true, finalizedSlotId: 'slot-1', selectedRestaurantId: 'alley-table' };
    const changed = gatherReducer(stale, { type: 'SET_DATES', dates: futureDates() });
    expect(changed.finalizedSlotId).toBeNull();
    expect(changed.selectedRestaurantId).toBeNull();
    expect(changed.roomCreated).toBe(false);
    expect(changed.scene).toBe('create');
  });

  it('reopen, vote updates, and preference changes invalidate downstream choices', () => {
    let state = withDates(initialState(), futureDates('2026-10-09'));
    state = { ...state, roomCreated: true, finalizedSlotId: 'slot-1', selectedRestaurantId: 'alley-table', scene: 'complete' };
    state = gatherReducer(state, { type: 'REOPEN' });
    expect(state.finalizedSlotId).toBeNull();
    expect(state.selectedRestaurantId).toBeNull();
    state = { ...state, guestDraft: { nickname: 'Amy', availability: { 'slot-1': 'available', 'slot-2': 'unavailable', 'slot-3': 'unavailable' } } };
    state = gatherReducer(state, { type: 'SUBMIT_VOTE' });
    expect(state.finalizedSlotId).toBeNull();
    state = { ...state, finalizedSlotId: 'slot-1', scene: 'restaurants' };
    state = gatherReducer(state, { type: 'SET_RESTAURANT_PREFS', patch: { wheelchair: true } });
    expect(state.selectedRestaurantId).toBeNull();
  });

  it('filters hard mismatches while exposing unknown requested requirements', () => {
    const matches = restaurantResults({ budget: 600, vegetarian: false, longStay: true, cuisine: 'any', wheelchair: true }, 'zhongshan', 3);
    expect(matches.some(item => item.id === 'paper-lantern')).toBe(false);
    expect(matches.some(item => item.id === 'night-sail' && item.needsConfirmation.length === 0)).toBe(true);
    expect(matches.some(item => item.id === 'green-hour' && item.needsConfirmation.includes('accessibility'))).toBe(true);
  });

  it('returns explicit eligible and excluded sets, ordered with complete matches first', () => {
    const evaluation = evaluateRestaurants({ budget: 600, vegetarian: false, longStay: true, cuisine: 'any', wheelchair: true }, 'zhongshan', 3);
    expect(evaluation.eligible.some(item => item.id === 'paper-lantern')).toBe(false);
    expect(evaluation.excluded.find(item => item.id === 'paper-lantern')?.hardMismatch).toContain('accessibility');
    expect(evaluation.eligible[0].needsConfirmation).toEqual([]);
    expect(evaluation.eligible.find(item => item.id === 'green-hour')?.needsConfirmation).toContain('accessibility');
  });

  it('completion derives confirmed and tentative names without adding the host', () => {
    let state = withDates(initialState(), futureDates('2026-10-09'));
    state = { ...state, roomCreated: true };
    state = gatherReducer(state, { type: 'FINALIZE', slotId: 'slot-1' });
    state = { ...state, scene: 'restaurants' };
    expect(finalizedAttendees(state)).toEqual({ confirmed: ['Amy', 'Yuki', 'Sara'], tentative: ['Jin'] });
    state = gatherReducer(state, { type: 'SELECT_RESTAURANT', restaurantId: 'alley-table' });
    expect(selectedCompletion(state)?.confirmed).toEqual(['Amy', 'Yuki', 'Sara']);
    expect(selectedCompletion(state)).toMatchObject({ host: '示範使用者', location: 'zhongshan', confirmedCount: 3, tentativeCount: 1, title: '好久不見的週末聚餐' });
  });

  it('requires the host to choose restaurants and keeps completion facts in the shared state', () => {
    let state = withDates(initialState(), futureDates());
    state = { ...state, roomCreated: true, scene: 'vote' };
    state = gatherReducer(state, { type: 'FINALIZE', slotId: 'slot-2' });
    const friend = { ...state, role: 'friend' as const, scene: 'restaurants' as const };
    expect(gatherReducer(friend, { type: 'SET_RESTAURANT_PREFS', patch: { budget: 400 } }).restaurantPreferences.budget).toBe(600);
    expect(gatherReducer(friend, { type: 'SELECT_RESTAURANT', restaurantId: 'alley-table' }).selectedRestaurantId).toBeNull();
    state = { ...state, scene: 'restaurants' };
    state = gatherReducer(state, { type: 'SELECT_RESTAURANT', restaurantId: 'alley-table' });
    expect(selectedCompletion(state)).toMatchObject({ date: futureDates()[1], time: '19:00', location: 'zhongshan', host: '示範使用者', confirmedCount: 3 });
  });
  it('applies budget, party size, cuisine and area independently without relaxing requirements', () => {
    const prefs = { budget: 400 as const, vegetarian: false, longStay: false, cuisine: 'any' as const, wheelchair: false };
    expect(restaurantResults(prefs, 'zhongshan', 4).map(r => r.id)).toEqual(['small-terrace']);
    expect(restaurantResults(prefs, 'zhongshan', 5)).toEqual([]);
    expect(restaurantResults({ ...prefs, budget: 600, cuisine: 'japanese' }, 'zhongshan', 4).map(r => r.id)).toEqual(['paper-lantern']);
    expect(restaurantResults(prefs, 'taipei-station', 4).map(r => r.id)).toEqual(['north-gate-noodles']);
    expect(restaurantResults({ ...prefs, longStay: true }, 'zhongshan', 4)).toEqual([]);
  });

  it('preserves edited dates, times and nickname through room creation and role switches', () => {
    let state = gatherReducer(initialState(), { type: 'RESET', dates: futureDates(), nickname: 'You' });
    state = gatherReducer(state, { type: 'SET_SCENE', scene: 'create' });
    state = gatherReducer(state, { type: 'SET_SLOT_TIME', index: 0, time: '20:45' });
    const changedDates = [addDays(futureDates()[0], 1), ...futureDates().slice(1)];
    state = gatherReducer(state, { type: 'SET_DATES', dates: changedDates });
    state = gatherReducer(state, { type: 'CREATE_ROOM' });
    state = gatherReducer(state, { type: 'SET_ROLE', role: 'friend' });
    state = gatherReducer(state, { type: 'SET_SCENE', scene: 'vote' });
    expect(state.slots[0]).toMatchObject({ date: changedDates[0], time: '20:45' });
    expect(state.guestDraft.nickname).toBe('You');
  });

  it('carries unknown venue conditions and edited event facts into the copied notification', () => {
    let state = withDates(initialState(), futureDates());
    state = { ...state, title: 'Edited dinner', hostName: 'Edited host', roomCreated: true, scene: 'vote' };
    state = gatherReducer(state, { type: 'FINALIZE', slotId: 'slot-3' });
    state = gatherReducer(state, { type: 'SET_SCENE', scene: 'restaurants' });
    state = gatherReducer(state, { type: 'SET_RESTAURANT_PREFS', patch: { wheelchair: true } });
    state = gatherReducer(state, { type: 'SELECT_RESTAURANT', restaurantId: 'green-hour' });
    const completion = selectedCompletion(state)!;
    expect(completion.restaurant.needsConfirmation).toEqual(['accessibility']);
    expect(completionText(completion, 'en')).toContain('To confirm: wheelchair access');
    expect(completionText(completion, 'zh')).toContain('待確認：輪椅友善設施');
    expect(completionText(completion, 'en')).toContain(`Date: ${state.slots[2].date} 19:30`);
    expect(completionText(completion, 'en')).toContain('Edited host');
    expect(completionText(completion, 'en')).toContain('[Demo] Edited dinner');
    state = gatherReducer(state, { type: 'REOPEN' });
    expect(selectedCompletion(state)).toBeNull();
    state = gatherReducer(state, { type: 'RESET', dates: futureDates() });
    expect(state.participants).toHaveLength(5);
    expect(state.finalizedSlotId).toBeNull();
    expect(state.restaurantPreferences.wheelchair).toBe(false);
  });

});
