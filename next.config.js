const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

let SiteUrl;

if (process.env.SITE_URL) {
    SiteUrl = process.env.SITE_URL;
} else if (process.env.VERCEL_URL) {
    SiteUrl = `https://${process.env.VERCEL_URL}`;
} else {
    SiteUrl = 'http://localhost:3000';
}

module.exports = withPlugins([
    withOptimizedImages,
    {
        env: {
            API_URL: process.env.API_URL || 'https://api.fluro.io',
            SITE_URL: SiteUrl,
        },
    },
]);
