export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  basic: {
    user: process.env.BASIC_USERNAME,
    password: process.env.BASIC_PASSWORD,
  },
});
