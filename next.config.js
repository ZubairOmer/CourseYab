module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/edemy",
    DB_URI:
      "mongodb+srv://zubair-omer:ZO@SEIM@I77@cluster0.epqvm4g.mongodb.net/edemy?retryWrites=true&w=majority",

    CLOUDINARY_CLOUD_NAME: "dk2gaxwi4",
    CLOUDINARY_API_KEY: "672963364748282",
    CLOUDINARY_API_SECRET: "kb26DulXiVaj2LpBUATG0b932Hs",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "c77e3951a51e2c",
    SMTP_PASSWORD: "9a4ad65402d950",
    SMTP_FROM_EMAIL: "noreplyzubair@gmail.com",
    SMTP_FROM_NAME: "noreplyZubair",

    webpack: (config, { dev }) => {
      config.node = {
        fs: "empty",
      };
      return config;
    },

    // NEXTAUTH_URL: "http://localhost:3000",

    API: "http://localhost:3000/api",
  },
};
