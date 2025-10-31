import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongodb';
import Blog from '../../models/Blog';

const BASE_URL = 'https://amldecoded.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    await dbConnect();

    // Static pages
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/books', priority: '0.8', changefreq: 'monthly' },
    ];

    // Dynamic blog pages
    const blogs = await Blog.find({}, 'updatedAt').sort({ updatedAt: -1 });
    const blogPages = blogs.map((blog) => ({
      url: `/blog/${blog._id}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: blog.updatedAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
    }));

    // Combine all pages
    const allPages = [...staticPages, ...blogPages];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}