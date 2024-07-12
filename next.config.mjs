/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp4$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'video/mp4',
          },
        },
      });
      return config;
    },
    images:{
      domains:['images.unsplash.com']
    }
  };
  
  export default nextConfig;