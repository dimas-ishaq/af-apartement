export enum Role{
  ADMIN='ADMIN',
  USER='USER'
}
export default interface Session {
  user_id :string;
  refresh_token: string;
  type:string;
}