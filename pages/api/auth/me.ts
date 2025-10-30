import { NextApiRequest, NextApiResponse } from 'next';
import { authenticateRequest } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = authenticateRequest(req, res);
  if (!user) return;

  res.status(200).json({
    user: {
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}