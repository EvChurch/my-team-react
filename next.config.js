const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([
    withOptimizedImages,
    {
        env: {
            API_URL: process.env.API_URL || 'https://api.fluro.io',
        },
    },
]);
