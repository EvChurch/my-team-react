import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const options = {
    providers: [
        Providers.Credentials({
            name: 'Fluro',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async ({ username, password }) => {
                try {
                    const { data } = await Axios.post(`${process.env.API_URL}/auth/login`, { username, password });
                    return Promise.resolve(data);
                } catch (err) {
                    return Promise.resolve(null);
                }
            },
        }),
    ],
    callbacks: {
        session: async (session, user) => {
            return Promise.resolve({ ...session, user: { ...session.user, token: user.token, image: user.image } });
        },
        jwt: async (token, user) => {
            if (user) {
                return Promise.resolve({
                    ...token,
                    token: user.token,
                    image: `${process.env.API_URL}/get/avatar/persona/${user.persona}?w=100&access_token=${user.token}`,
                });
            } else {
                return Promise.resolve(token);
            }
        },
    },
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60,
    },
};

const ApiAuthNextAuth = (req: NextApiRequest, res: NextApiResponse): void => NextAuth(req, res, options);

export default ApiAuthNextAuth;
