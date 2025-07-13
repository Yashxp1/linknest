import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcryptjs.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};

export const generateToken = (payload: {
  id: string;
  username: string;
}): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });


  return token;
};

export const verifyToken = (
  token: string
): { id: string; username: string } | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
    };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
