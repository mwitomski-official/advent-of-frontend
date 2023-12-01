// Tutaj skopiuj kod zadania

export class GiftRegistry {
  gifts: Array<{ id: number; name: string }> = [];

  addGift(id: number, name: string): void {
    this.gifts.push({ id, name });
  }

  removeGift(id: number, name: string): void {
    let index = this.gifts.findIndex((i) => i.id === id && i.name === name);
    if (index === -1) throw new Error("Gift not found");
    this.gifts.splice(index, 1);
  }

  getGiftsForChild(id: number) {
    return this.gifts.filter((gift) => gift.id === id).map((gift) => gift.name);
  }
}
