
export enum Role{
  User = "User",
  Admin = "Admin"
}
export default interface Session {
  user_id :string;
  refresh_token: string;
  type: string;
}