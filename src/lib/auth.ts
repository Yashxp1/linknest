import { SignJWT, jwtVerify } from 'jose';
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

export const generateToken = async (payload: {
  id: string;
  username: string;
}): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
    
  return token;
};

export const verifyToken = async (
  token: string
): Promise<{ id: string; username: string } | null> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    
    return payload as { id: string; username: string };
  } catch (error: any) {
    console.error('Invalid token:', error.message);
    return null;
  }
};