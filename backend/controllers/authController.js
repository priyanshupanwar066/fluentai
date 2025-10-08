import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper function for error responses
const handleError = (res, status, message, error = null) => {
  if (error) console.error("Auth Error:", error);
  return res.status(status).json({
    success: false,
    message,
    error: error?.message || null,
  });
};

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    const errors = [];
    if (!username?.trim()) errors.push("Username is required");
    if (!email?.trim()) errors.push("Email is required");
    if (!password?.trim()) errors.push("Password is required");

    if (errors.length > 0) {
      return handleError(res, 400, "Validation failed", { details: errors });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleError(res, 400, "Invalid email format");
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return handleError(res, 409, "User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set secure cookie
    // In both loginUser and registerUser functions:
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from 'strict'
      maxAge: 60 * 60 * 1000,
      path: "/",
      // domain: 'localhost' // Uncomment if needed for development
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    return handleError(res, 500, "Registration failed", err);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email?.trim() || !password?.trim()) {
      return handleError(res, 400, "Email and password are required");
    }

    // Find user
    const user = await User.findOne({ email: email.trim().toLowerCase() })
      .select("+password")
      .lean();

    if (!user) {
      return handleError(res, 401, "Invalid credentials");
    }

    // Verify password
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) {
      return handleError(res, 401, "Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set secure cookie
    // In both loginUser and registerUser functions:
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from 'strict'
      maxAge: 60 * 60 * 1000,
      path: "/",
      // domain: 'localhost' // Uncomment if needed for development
    });

    // Remove sensitive data
    delete user.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    return handleError(res, 500, "Login failed", err);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return res.status(200).json({ success: true, message: "Logout successful" });
};

// Middleware for protected routes
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return handleError(res, 401, "Authorization required");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("token");
      return handleError(res, 401, "Invalid or expired token");
    }

    req.userId = decoded.userId;
    next();
  });
};
