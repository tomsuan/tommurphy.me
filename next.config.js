module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**', // Allow all paths under dummyimage.com
      },
    ],
  },
};