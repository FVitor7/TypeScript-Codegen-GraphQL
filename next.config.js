/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/graphql",
          destination: "https://starlette-strawberry-graphql.herokuapp.com/graphql",
        },
      ],
    };
  },
};
