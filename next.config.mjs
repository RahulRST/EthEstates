import pkg from 'next/dist/compiled/webpack/webpack.js';

const { webpack } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['noun-api.com'],
        dangerouslyAllowSVG: true,
    }, 
    webpack: (config, { isServer }) => {
        config.plugins.push(new webpack.ProgressPlugin((percentage, message, ...args) => {
            // e.g. Output each progress message directly to the console:
            console.info(percentage, message, ...args);
          }));
        return config;
    }

};



export default nextConfig;
