
enum Status {
    CONFIRM = "CONFIRM",
    WAITING = "WAITING",
    CANCEL = "CANCEL"
  }

export default interface Reservation {
    id: string;
    userId: string;
    guest_name: string;
    buildingId: string;
    unitId: string;
    priceId: string;
    priceCategoryId: string;
    checkIn: Date;
    checkOut: Date;
    status: Status;
}