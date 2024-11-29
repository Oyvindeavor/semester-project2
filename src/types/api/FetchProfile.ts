/* eslint-disable */

export interface Image {
  url: string;
  alt: string;
}

export interface Count {
  listings: number;
  wins: number;
}

export interface UserData {
  name: string;
  email: string;
  bio: string;
  avatar: Image;
  banner: Image;
  credits: number;
  listings: [];
  wins: [];
  _count: Count;
}

export interface UserResponse {
  profile: {
    data: UserData;
    meta: Record<string, unknown>;
  };
}
