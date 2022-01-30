/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/graphql",
          destination: "http://starlette-strawberry-graphql.herokuapp.com/graphql",
        },
      ],
    };
  },
};
