import { generateRssFeed } from '../rss.xml.js';

// Turkish RSS feed
export async function GET(context) {
  return generateRssFeed(context, 'tr');
}
