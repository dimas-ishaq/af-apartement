
enum Role {
  Admin = "Admin"
}

export default interface Admin {
  id?: string;
  name: string;
  email: string;
  password: string;
  tanggal_lahir?: Date;
  no_telephone?: string;
  profile_picture?: string;
  role: Role.Admin;
}