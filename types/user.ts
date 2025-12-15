export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse { success: boolean; data: User };