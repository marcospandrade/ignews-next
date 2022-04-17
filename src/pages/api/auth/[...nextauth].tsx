import { query as q } from 'faunadb';
import NextAuth, { User, Account, Profile } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { fauna } from '../../../services/fauna';

interface signInProps {
    user: User;
    account: Account;
    profile: Profile;
    email: {
        verificationRequest?: boolean;
    };
}

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'user:email'
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    // jwt: {
    //     secret: process.env.JWT_SECRET
    // },
    callbacks: {
        async signIn({ user, account, profile }: signInProps) {
            const { email } = user;

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email)
                                )
                            )
                        ),
                        q.Create(q.Collection('users'), { data: { email } }),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                );
                return true;
            } catch {
                return false;
            }
        }
    }
});
