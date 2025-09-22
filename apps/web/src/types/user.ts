export type User = {
  email: string;
  password: string;
};

export type UserProfile = {
  email: string;
  username: string;
  bio?: string;
  profileImage?: string;
};
