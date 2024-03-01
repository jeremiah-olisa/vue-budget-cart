import { defineStore } from 'pinia'

export class CartItem {
  constructor(
    public id: string,
    public name: string,
    public unitPrice: number,
    public quantity: number
  ) {}

  itemTotal() {
    return this.unitPrice * this.quantity
  }
}

export const useAppStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    selectedItems: [] as string[],
    totalBudget: 0
  }),
  getters: {
    cartTotal(): number {
      return this.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    },
    remainingBudget(): number {
      return this.totalBudget - this.cartTotal
    },
    selectItemsTotal(): number {
      let total = 0
      for (const itemId of this.selectedItems) {
        const selectedItem = this.items.find((item) => item.id === itemId)
        console.log({ itemId, selectedItem, selectedItems: this.selectedItems, items: this.items })
        if (selectedItem) {
          total += selectedItem.unitPrice * selectedItem.quantity
        }
      }
      return total
    },
    selectedItemsDifference(): number {
      return this.totalBudget - this.selectItemsTotal
    }
  },
  actions: {
    addItem(item: CartItem) {
      this.items.push(item)
    },
    setBudget(budget: number) {
      this.totalBudget = budget
    },
    setSelectedItems(items: string[]) {
      this.selectedItems = items
    },
    deSelectallItems() {
      this.selectedItems.length = 0
    },
    clearCart() {
      this.items.length = 0
      this.deSelectallItems()
    },
    deleteSelectedItems() {
      this.items = this.items.filter((c) => !this.selectedItems.includes(c.id))
      this.deSelectallItems()
    },
    clearBudget() {
      this.totalBudget = 0
    },
    getItemTotal(id: string): number {
      const item = this.items.find((c) => c.id == id)

      return (item?.unitPrice ?? 0) * (item?.quantity ?? 0)
    },
    removeItem(id: string) {
      this.items = this.items.filter((c) => c.id != id)
    },
    removeSelectedItem(itemId: string) {
      this.selectedItems = this.selectedItems.filter((c) => c != itemId)
    },
    addSelectedItem(itemId: string) {
      this.selectedItems.push(itemId)
    },
    isSelected(itemId: string) {
      return this.selectedItems.includes(itemId)
    },
    toggleItem(itemId: string) {
      if (!this.isSelected(itemId)) this.setSelectedItems([...this.selectedItems, itemId])
      this.removeSelectedItem(itemId)
    }
  },
  persist: true
})
