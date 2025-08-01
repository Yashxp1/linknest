import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import authConfig from './auth.config';
import { getUserById } from './data/user';
import { getAccountByUserId } from './data/accounts';
import { generateSlug } from './lib/GenerateSlug';


// function getSlugSource(user: {
//   name?: string | null;
//   email?: string | null;
//   id?: string;
// }): string {
//   return user.name ?? user.email ?? user.id ?? crypto.randomUUID();
// }

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  events: {
    async createUser({ user }) {
      const slug = generateSlug(
        user.name || user.email || user.id || crypto.randomUUID()
      );
      await prisma.user.update({
        where: { id: user.id },
        data: { slug },
      });
    },
  },

  callbacks: {
    async signIn({  account }) {
      if (account?.provider !== 'credentials') {
        return true;
      }

      // const existingUser = await getUserById(user.id ?? '');
      // if (!existingUser?.emailVerified) return false;

      return true;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      return token;
    },
    async session({ token, session }) {
      // console.log('Session token: ', token);
      // console.log('Session object: ', session);

      if (!token?.sub) return session;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return session;

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          slug: existingUser.slug,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
