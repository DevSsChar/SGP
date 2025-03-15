import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import connectDB from '@/db/connectDB';
import User from '@/models/User';

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
          dbUser = await User.create({
            FullName: profile.name || profile.login,
            Email: email,
            Age: '',
            Location: '',
            Skills: "",
            SoftSKills: "",
            Languages: "",
            Interests: "",
            githubId: profile.id,
            // avatar: profile.avatar_url
          });
          
          console.log('New user created:', dbUser);
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
        // Add additional user info to token if needed
        token.githubId = profile?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        // Add any additional user info to session if needed
        const dbUser = await User.findOne({ Email: session.user.email });
        if (dbUser) {
          session.user.dbId = dbUser._id;
          session.user.profileCompleted = Boolean(dbUser.Age && dbUser.Location);
        }
      }
      return session;
    }
  },
});

export { handler as GET, handler as POST }; 