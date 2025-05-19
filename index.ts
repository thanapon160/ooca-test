export type MenuItem = 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Pink' | 'Purple' | 'Orange';

const menuPrices: Record<MenuItem, number> = {
  Red: 50,
  Green: 40,
  Blue: 30,
  Yellow: 50,
  Pink: 80,
  Purple: 90,
  Orange: 120
};

export interface Order {
  Red: number;
  Green: number;
  Blue: number;
  Yellow: number;
  Pink: number;
  Purple: number;
  Orange: number;
}

export function calculateTotal(order: Order, hasMembership: boolean = false): number {
    let total = 0;

    for (const item in order) {
      const key = item as MenuItem;
      const quantity = order[key];
      total += quantity * menuPrices[key];
    }

    total -= calculateItemDiscount(order);

    if (hasMembership) {
      total *= 0.9;
    }

    return parseFloat(total.toFixed(2));
}

export function calculateItemDiscount(order: Order): number {
    let discount = 0;
    const discountItem: MenuItem[] = ['Orange', 'Pink', 'Green'];

    for (const item of discountItem) {
      const quantity = order[item];
      if (quantity >= 2) {
        discount += quantity * menuPrices[item] * 0.05;
      }
    }

    return discount;
}
