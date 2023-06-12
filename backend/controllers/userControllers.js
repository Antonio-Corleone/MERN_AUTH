import expressAsyncHandler from "express-async-handler";
import User from '../models/userModels.js';
import generateToken from "../utils/generateToken.js";

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public
const authUser = expressAsyncHandler(async (req, res, next) => {
  const findUser = await User.findOne({ email: req.body.email });
  if (findUser && (await findUser.isPasswordMatched(req.body.password))) {
    generateToken(res, findUser._id)
    res.status(201).json({
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400);
    throw new Error("user has already existed")
  }
  const newUser = await User.create(req.body);
  if (newUser) {
    generateToken(res, newUser._id)
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    })
  } else {
    res.status(400)
    throw new Error("Invalid user")
  }
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = expressAsyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: "Logout successfully" })
})

// @desc    Get users profile
// route    GET /api/users/profile
// @access  Private
const getUserProfile = expressAsyncHandler(async (req, res, next) => {
  const userProfile = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }
  res.status(200).json(userProfile)
})

// @desc    Update users profile
// route    Put /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res, next) => {

  //@desc update user by findByIdAndUpdate()
  // const user = await User.findById(req.user._id)
  // if (!user) {
  //   res.status(404)
  //   throw new Error("User does not exist")
  // }
  // const updateUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })
  // res.status(201).json({
  //   _id: updateUser._id,
  //   name: updateUser.name,
  //   email: updateUser.email
  // })

  //@desc update user by save() method
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
}