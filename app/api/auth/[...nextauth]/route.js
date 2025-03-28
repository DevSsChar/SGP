import connectDB from '@/db/connectDB';
import User from '@/models/User';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        // Get email from GitHub profile
        const email = profile.email || `${profile.login}@github.com`;

        // Check if user already exists
        let dbUser = await User.findOne({ Email: email });

        if (!dbUser) {
          // Create new user if doesn't exist
          // this.session.user.mvrfy = false;
          dbUser = await User.create({
            FullName: profile.name || profile.login,
            Email: email,
            Age: '',
            Location: '',
            Skills: "",
            SoftSKills: "",
            Languages: "",
            Interests: "",
            mobileVerified: false,
            selectedCareers: []
            // githubId: profile.id,
          });
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.githubId = profile?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        const dbUser = await User.findOne({ Email: session.user.email });
        if (dbUser) {
          session.user.dbId = dbUser._id;
          session.user.mvrfy = dbUser.mobileVerified || false;
        }
      }
      return session;
    }
  },
});

export { handler as GET, handler as POST };
