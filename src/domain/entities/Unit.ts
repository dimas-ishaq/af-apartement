export enum Status{
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE"
}
export default interface Unit {
  id?: string
  buildingId: string
  name: string
  status: string
  createdAt?: Date
  updatedAt?: Date
}