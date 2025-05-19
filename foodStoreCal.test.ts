// foodStoreCalculator.test.ts
import { calculateTotal, Order } from './index'

describe('FoodStoreCalculator', () => {
  const createOrder = (overrides: Partial<Order> = {}): Order => ({
    Red: 0,
    Green: 0,
    Blue: 0,
    Yellow: 0,
    Pink: 0,
    Purple: 0,
    Orange: 0,
    ...overrides
  });

  it('calculates total price without any discount', () => {
    const order = createOrder({ Red: 1, Green: 1 });
    const total = calculateTotal(order);
    expect(total).toBe(90);
  });

  it('applies 10% membership discount', () => {
    const order = createOrder({ Red: 1, Green: 1 });
    const total = calculateTotal(order, true);
    expect(total).toBeCloseTo(81);
  });

  it('applies 5% discount for double Orange set', () => {
    const order = createOrder({ Orange: 2 });
    const total = calculateTotal(order);
    expect(total).toBeCloseTo(240 - (240 * 0.05));
  });

  it('applies both membership and item discounts', () => {
    const order = createOrder({ Green: 2, Pink: 2, Orange: 2 });
    const subtotal = (2 * 40) + (2 * 80) + (2 * 120);
    const itemDiscount = (2 * 40 * 0.05) + (2 * 80 * 0.05) + (2 * 120 * 0.05);
    const afterItemDiscount = subtotal - itemDiscount;
    const expected = afterItemDiscount * 0.9;

    const total = calculateTotal(order, true);
    expect(total).toBeCloseTo(expected);
  });

  it('returns 0 for empty order', () => {
    const order = createOrder();
    const total = calculateTotal(order);
    expect(total).toBe(0);
  });
});
