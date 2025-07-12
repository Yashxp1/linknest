import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
