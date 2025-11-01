import express from 'express';
import userController from './user.controller.js';
const router = express.Router();

router.post('/create', async (req, res) => {
   try {
    const user = await userController.createUser(req);
    res.json(user);
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

router.get('/get-all-users', async (req, res) => {
   try {
    const users = await userController.getAllUsers(req);
    res.json(users);
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

router.get('/:id', async (req, res) => {
   try {
    const user = await userController.getUserById(req);
    res.json(user);
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

router.put('/:id', async (req, res) => {
   try {
    const user = await userController.updateUser(req);
    res.json(user);
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

router.delete('/:id', async (req, res) => {
   try {
   await userController.deleteUser(req);
    res.json({
        success: true,
        message: 'User deleted successfully'
    });
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

router.delete('/:id/all', async (req, res) => {
   try {
   await userController.deleteAllUsers(req);
    res.json({
        success: true,
        message: 'All users deleted successfully'
    });
   } catch (error:unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        res.status(500).json({ 
            success: false,
            message: errorMessage 
        });
   }
});

export default router;



