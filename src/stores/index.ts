import { defineStore } from 'pinia';

export class CartItem {
    constructor(public id: number, public name: string, public unitPrice: number, public quantity: number) { }

    itemTotal() {
        return this.unitPrice * this.quantity;
    }
}

export const useAppStore = defineStore('cart', {
    state: () => ({
        items: [] as CartItem[],
        totalBudget: 0,
    }),
    getters: {
        cartTotal(): number {
            return this.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
        },
        remainingBudget(): number {
            return this.totalBudget - this.cartTotal;
        },
    },
    actions: {
        addItem(item: CartItem) {
            this.items.push(item);
        },
        setBudget(budget: number) {
            this.totalBudget = budget;
        },
        clearCart() {
            this.items.length = 0;
        },
        clearBudget() {
            this.totalBudget = 0;
        },
        getItemTotal(id: number): number {
            const item = this.items.find(c => c.id == id);

            return (item?.unitPrice ?? 0) * (item?.quantity ?? 0)
        },
        removeItem(id: number) {
            this.items = this.items.filter(c => c.id !== id);
        },
    },
    persist: true
});
