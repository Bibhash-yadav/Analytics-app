import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";

export const register = async (
req: Request,
res: Response
) => {
try {
const {
name,
email,
password,
role,
} = req.body;

   
if (
  !name ||
  !email ||
  !password
) {
  return res.status(400).json({
    message:
      "All fields are required",
  });
}

const existingUser =
  await prisma.user.findUnique({
    where: {
      email,
    },
  });

if (existingUser) {
  return res.status(400).json({
    message:
      "User already exists",
  });
}

const hashedPassword =
  await bcrypt.hash(
    password,
    10
  );

const user =
  await prisma.user.create({
    data: {
      name,
      email,
      password:
        hashedPassword,
      role:
        role || "USER",
    },
  });

const token =
  generateToken(
    user.id,
    user.role
  );

res.status(201).json({
  message:
    "Registration successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt:
      user.createdAt,
  },
});
   

} catch (error) {
console.error(error);

   
res.status(500).json({
  message:
    "Internal Server Error",
});
   

}
};

export const login = async (
req: Request,
res: Response
) => {
try {
const {
email,
password,
} = req.body;

   
if (
  !email ||
  !password
) {
  return res.status(400).json({
    message:
      "Email and password are required",
  });
}

const user =
  await prisma.user.findUnique({
    where: {
      email,
    },
  });

if (!user) {
  return res.status(404).json({
    message:
      "User not found",
  });
}

const isMatch =
  await bcrypt.compare(
    password,
    user.password
  );

if (!isMatch) {
  return res.status(401).json({
    message:
      "Invalid credentials",
  });
}

const token =
  generateToken(
    user.id,
    user.role
  );

res.status(200).json({
  message:
    "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt:
      user.createdAt,
  },
});
   

} catch (error) {
console.error(error);

   
res.status(500).json({
  message:
    "Internal Server Error",
});
   

}
};
