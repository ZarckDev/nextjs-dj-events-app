// hit strapi endpoint user/me, send token and give back the user for that token
import { API_URL } from '@/config/index';
import cookie from 'cookie';

export default async (req, res) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // yes for production for https
        expires: new Date(0), // set date 0 to be before now
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Mehod ${req.method} not allowed` });
  }
};
