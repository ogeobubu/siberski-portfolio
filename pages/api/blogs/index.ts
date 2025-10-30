import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
      }
      break;

    case 'POST':
      try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create blog' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}