export type RegisterRequest = {
  id: string;
  password: string;
  nickname: string;
};

export type RegisterResponse = {
  message: string;
  success: boolean;
};

export type LogInRequest = {
  id: string;
  password: string;
};

export type LogInResponse = {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string | null;
  nickname: string;
};

export type User = {
  id: string;
  nickname: string;
  avatar: string | null;
  success: boolean;
};

export type ProfileRequest = {
  avatar: File | undefined;
  nickname: string;
};

export type ProfileResponse = {
  avatar: string;
  nickname: string;
  message: string;
  success: boolean;
};

export type ErrorResponse = {
  message: string;
};

export type AuthStoreType = {
  nickname: string;
  avatar: string;
  setNickname: (nickname: string) => void;
  setAvatar: (avatar: string) => void;
};
