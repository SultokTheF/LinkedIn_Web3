interface User {
  _id?: string,
  username?: string;
  bio?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  wallet_address?: string;
  created_at?: Date;
}

export default User;