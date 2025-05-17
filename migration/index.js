require('dotenv').config();
const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2/promise');
const TurndownService = require('turndown');

// Check if --tr flag is passed
const isTurkish = process.argv.includes('--tr');
const dbName = isTurkish ? process.env.DB_NAME_TR : process.env.DB_NAME;
const postsDir = path.join(__dirname, '../src/content/blog', isTurkish ? 'tr' : '');

const turndown = new TurndownService({
    codeBlockStyle: 'fenced',
    escapeCodeBlock: false,
    headingStyle: 'atx' // This will use # symbols for headings
});

// Function to replace WordPress image URLs with local paths
function replaceImageUrls(content, isTraUrlPrefix) {
    const langPrefix = isTraUrlPrefix ? '/tr/' : '/en/';
    
        // Simply replace just the CDN prefix for all URLs, keeping everything else intact
    // This approach is simpler and preserves query strings
    let processedContent = content.replace(
        /https?:\/\/i[0-9]\.wp\.com\/mfyz\.com\//g, 
        'https://mfyz.com/'
    );
    
    // If we need to replace the URLs with local paths, we would do this separately
    // For now, let's just fix the CDN prefixes
    
    // Step 2: Replace URLs with the tr subdomain (they're definitely Turkish)
    processedContent = processedContent.replace(
        /https?:\/\/(?:www\.)?tr\.mfyz\.(?:com|wp)\/wp-content\/uploads\/([0-9]{4})\/([0-9]{2})\/([^"\s)]+)/g, 
        (match, year, month, filename) => `/images/archive/tr/${year}/${month}/${filename}`
    );
    
    // Step 3: Replace regular URLs using the language prefix from the script mode
    return processedContent.replace(
        /https?:\/\/(?:www\.)?mfyz\.(?:com|wp)\/wp-content\/uploads\/([0-9]{4})\/([0-9]{2})\/([^"\s)]+)/g, 
        (match, year, month, filename) => `/images/archive${langPrefix}${year}/${month}/${filename}`
    );
}

// Configure code blocks to use triple backticks
turndown.addRule('pre', {
    filter: 'pre',
    replacement: function(content) {
        return '\n```\n' + content + '\n```\n'
    }
});

async function connectToDatabase() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: dbName
    });
}

async function getPosts(connection) {
    const [rows] = await connection.execute(`
        SELECT 
            p.ID,
            p.post_title, 
            p.post_content,
            p.post_date,
            p.post_name,
            p.guid,
            GROUP_CONCAT(DISTINCT t.name) as tags,
            GROUP_CONCAT(DISTINCT c.name) as categories
        FROM ${process.env.WP_TABLE_PREFIX}posts p
        LEFT JOIN ${process.env.WP_TABLE_PREFIX}term_relationships tr ON p.ID = tr.object_id
        LEFT JOIN ${process.env.WP_TABLE_PREFIX}term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
        LEFT JOIN ${process.env.WP_TABLE_PREFIX}terms t ON tt.term_id = t.term_id
        LEFT JOIN ${process.env.WP_TABLE_PREFIX}terms c ON (tt.taxonomy = 'category' AND tt.term_id = c.term_id)
        WHERE p.post_status = 'publish' AND p.post_type = 'post'
        GROUP BY p.ID
    `);
    return rows;
}

async function processPost(post) {
    const date = new Date(post.post_date);
    const year = date.getFullYear();
    const formattedDate = date.toISOString().split('T')[0];
    const fileName = `${formattedDate}-${post.post_name}.md`;
    
    // Use the year as both the directory and part of the filename
    const yearFolder = year.toString();
    
    const frontMatter = {
        title: post.post_title,
        slug: post.post_name,
        date: date.toISOString().substring(0, 10),
        url: post.guid.replace('mfyz.wp', 'mfyz.com'),
        tags: post.tags ? post.tags.split(',') : [],
        category: post.categories ? post.categories.split(',')[0] : '',
        migration: {
            wpId: post.ID,
            wpPostDate: post.post_date,
        }
    };
    
    // Add lang: tr for Turkish posts
    if (isTurkish) {
        frontMatter.lang = 'tr';
    }

    // Convert HTML to Markdown
    let content = turndown.turndown(post.post_content);
    
    // Replace WordPress image URLs with local paths
    content = replaceImageUrls(content, isTurkish);
    return {
        year: yearFolder,
        fileName: fileName,
        content: `---
${Object.entries(frontMatter).map(([k, v]) => k === 'title' ? `${k}: "${v}"` : `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n')}
---

${content}`
    };
}

async function main() {
    try {
        const connection = await connectToDatabase();
        const posts = await getPosts(connection);
        console.log(`Found ${posts.length} posts to process${isTurkish ? ' (Turkish)' : ''}`);

        await fs.mkdir(postsDir, { recursive: true });

        for (const [index, post] of posts.entries()) {
            console.log(`Processing ${index + 1}/${posts.length}: ${post.post_title}`);
            const { year, fileName, content } = await processPost(post);
            
            // Create year directory if it doesn't exist
            const yearDir = path.join(postsDir, year);
            await fs.mkdir(yearDir, { recursive: true });
            
            // Write the file to the year directory
            await fs.writeFile(path.join(yearDir, fileName), content);
        }

        await connection.end();

        console.log('Export completed successfully!');
    } catch (error) {
        console.error('Export failed:', error);
        process.exit(1);
    }
}

main();
