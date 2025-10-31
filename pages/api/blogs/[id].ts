import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ error: 'Invalid blog ID' });
        }
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
        if ((error as Error).name === 'CastError') {
          return res.status(400).json({ error: 'Invalid blog ID format' });
        }
        res.status(500).json({ error: 'Failed to fetch blog' });
      }
      break;
      break;

    case 'PUT':
      try {
        const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update blog' });
      }
      break;

    case 'DELETE':
      try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}