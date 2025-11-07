export type createUserType = {
  name: string;
  email: string;
  password: string;
};

export type userType = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  role: string;
  image?: string | null;
  bio?: string | null;
  about?: string | null;
  location?: string | null;
  timezone?: string | null;
  skills?: string[] | null;
  languages?: string[] | null;
  hourlyRate?: number | null;
  isVerified?: boolean | null;
  isEmailVerified?: boolean | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
