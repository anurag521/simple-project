import { Document } from "mongoose";
import { Request } from 'express';

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface User extends Document {
  name?: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  phone?: string | null;
  collegeName?: string | null;
  collegeAddress?: Address | null;
  address?: Address | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserResponse {
    users: Array<Omit<User, keyof Document>>; 
    totalPages: number;
    currentPage: number;
    totalUsers: number;
}

// Define the UserController interface
export interface UserController {
    getAllUsers(req: Request): Promise<UserResponse>;
    getUserById(req: Request): Promise<User | null>;
    createUser(req: Request): Promise<User | null>;
    deleteUser(req: Request): Promise<void>;
    updateUser(req: Request): Promise<User | null>;
    deleteAllUsers(req: Request): Promise<{ message: string, deletedCount: number } | null>;
}