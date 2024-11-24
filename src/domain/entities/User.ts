
export default interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  tanggal_lahir?: Date;
  no_telephone?: string;
  profile_picture?: string;
  isConfirmed?: boolean;
}