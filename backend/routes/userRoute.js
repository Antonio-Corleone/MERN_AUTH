import express from "express";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userControllers.js';
import { protect } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post('/', registerUser)
route.post('/auth', authUser)
route.post('/logout', logoutUser)
route.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
export default route;