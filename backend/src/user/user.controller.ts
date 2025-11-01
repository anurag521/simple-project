
import Users from "./user.modal.js";
import { userUpdateSchema } from './user.zod.js';
import { User, UserController, UserResponse } from './user.type.js';
import { Types } from 'mongoose';
import { Request } from 'express';

const userController: UserController = {
    getAllUsers: async (req: Request): Promise<UserResponse> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = (page - 1) * limit;

            const users = await Users.find({ isActive: true, isAdmin: false })
                .skip(skip)
                .limit(limit)
                .lean();  // Convert Mongoose documents to plain JavaScript objects

            const totalUsers = await Users.countDocuments({ isActive: true, isAdmin: false });
            const totalPages = Math.ceil(totalUsers / limit);

            return {
                users,
                totalPages,
                currentPage: page,
                totalUsers
            };
        } catch (err: any) {
            console.error('Error fetching users:', err);
            throw err;
        }
    },
    getUserById: async (req: Request): Promise<User | null> => {
        try {
            const userId = req.params.id;
            const user = await Users.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (err: any) {
            console.error('Error fetching user:', err);
            throw err;
        }
    },
    createUser: async (req: Request): Promise<User | null> => {
        try {
            const validatedData = userUpdateSchema.parse(req.body);
            const user = new Users(validatedData);
            const savedUser = await user.save();
            return savedUser.toObject();
        } catch (err: any) {
            console.error('Error creating user:', err);
            throw err;
        }
    },
    updateUser: async (req: Request): Promise<User | null> => {
        try {
            const userId = req.params.id;
            const validatedData = userUpdateSchema.parse(req.body);
            const updatedUser = await Users.findByIdAndUpdate(userId, validatedData, { new: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        } catch (err: any) {
            console.error('Error updating user:', err);
            throw err;
        }
    },
    deleteAllUsers: async (req: Request): Promise<{ message: string, deletedCount: number }> => {
        try {
            // Get admin ID from URL params
            const adminId = req.params.id;

            //convert adminId to ObjectId
            const objectId = new Types.ObjectId(adminId);

            // 1. Verify admin user exists and is an admin
            const adminUser = await Users.findById(objectId);
            console.log(adminUser);

            if (!adminUser) {
                throw new Error('Admin user not found');
            }

            if (!adminUser.isAdmin) {
                throw new Error('Unauthorized: Only admin users can perform this action');
            }

            // 2. If admin verification passes, delete all non-admin users
            const result = await Users.deleteMany({ isAdmin: false });

            return {
                message: 'Successfully deleted all non-admin users',
                deletedCount: result.deletedCount
            };

        } catch (err: any) {
            console.error('Error in deleteAllUsers:', err);
            throw err;
        }
    },
    deleteUser: async (req: Request): Promise<void> => {
        try {
            const userId = req.params.id;
            const objectId = new Types.ObjectId(userId);
            console.log(objectId);
            const deletedUser = await Users.findByIdAndDelete(objectId);
            console.log(deletedUser);
            if (!deletedUser) {
                throw new Error('User not found');
            }
        } catch (err: any) {
            console.error('Error deleting user:', err);
            throw err;
        }
    }
};

export default userController;