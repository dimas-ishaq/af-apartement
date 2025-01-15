
enum Role {
  ADMIN = "ADMIN"
}

export default interface Admin {
  id?: string;
  name: string;
  email: string;
  password: string;
  tanggal_lahir?: Date;
  no_telephone?: string;
  profile_picture?: string;
  role: Role.ADMIN;
}