import { describe, expect, it } from 'vitest';
import { defaultPreferences, recommendRestaurants, restaurants, type RestaurantPreferences } from './restaurant-demo';

describe('restaurant demo recommendation rules', () => {
  it('returns a short list for the default formed-group preferences', () => {
    const result = recommendRestaurants(defaultPreferences);
    expect(result.matches.length).toBeGreaterThanOrEqual(3);
    expect(result.matches.length).toBeLessThanOrEqual(3);
    expect(result.eligibleCount).toBe(result.matches.length);
    expect(result.totalCount).toBe(6);
    expect(result.excludedCount).toBe(result.totalCount - result.eligibleCount);
  });

  it('applies the per-person budget limit', () => {
    const result = recommendRestaurants({ budget: 400, partySize: 4, vegetarian: false, longStay: false });
    expect(result.eligibleCount).toBe(3);
    expect(result.matches.every(restaurant => restaurant.price <= 400)).toBe(true);
    expect(result.matches.some(restaurant => restaurant.price > 400)).toBe(false);
  });

  it('requires enough seats for the whole party', () => {
    const result = recommendRestaurants({ budget: 800, partySize: 10, vegetarian: false, longStay: false });
    expect(result.matches.length).toBe(2);
    expect(result.matches.every(restaurant => restaurant.capacity >= 10)).toBe(true);
  });

  it('requires a vegetarian option when requested', () => {
    const result = recommendRestaurants({ budget: 800, partySize: 4, vegetarian: true, longStay: false });
    expect(result.eligibleCount).toBeGreaterThan(0);
    expect(result.matches.every(restaurant => restaurant.vegetarian)).toBe(true);
  });

  it('requires a place suitable for a longer stay when requested', () => {
    const result = recommendRestaurants({ budget: 800, partySize: 4, vegetarian: false, longStay: true });
    expect(result.eligibleCount).toBeGreaterThan(0);
    expect(result.matches.every(restaurant => restaurant.longStay)).toBe(true);
  });

  it('returns no recommendation when all constraints cannot be met', () => {
    const result = recommendRestaurants({ budget: 400, partySize: 10, vegetarian: true, longStay: true });
    expect(result).toEqual({ matches: [], eligibleCount: 0, totalCount: 6, excludedCount: 6 });
  });

  it('uses stable walk-time, price, and id ordering and caps matches at three', () => {
    const preferences = { budget: 800, partySize: 4, vegetarian: false, longStay: false } as const;
    const first = recommendRestaurants(preferences);
    const second = recommendRestaurants(preferences);
    expect(first.eligibleCount).toBe(6);
    expect(first.matches).toHaveLength(3);
    expect(first.matches.map(restaurant => restaurant.id)).toEqual(['north-gate-noodles', 'daylight-curry', 'alley-table']);
    expect(second.matches.map(restaurant => restaurant.id)).toEqual(first.matches.map(restaurant => restaurant.id));
  });

  it('does not mutate fixtures or preferences, and returns independent result objects', () => {
    const fixtureSnapshot = structuredClone(restaurants);
    const preferences: RestaurantPreferences = { budget: 600, partySize: 6, vegetarian: false, longStay: true };
    const preferenceSnapshot = { ...preferences };
    const result = recommendRestaurants(preferences);

    expect(preferences).toEqual(preferenceSnapshot);
    result.matches[0].name.zh = 'changed';
    result.matches.reverse();
    expect(restaurants).toEqual(fixtureSnapshot);
    expect(recommendRestaurants(preferenceSnapshot).matches[0].name.zh).toBe(fixtureSnapshot[0].name.zh);
  });
});
