export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  success: boolean;
  data: User;
}

export interface Owner {
  id: string;
  name: string;
  email: string;
  avatar: string;
  rating: number;
  toolsCount: number;
}

export interface OwnerResponse {
  success: boolean;
  data: Owner;
}
