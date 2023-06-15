export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  basic: {
    user: process.env.BASIC_USERNAME,
    password: process.env.BASIC_PASSWORD,
  },
  database: {
    host: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    port: parseInt(process.env.MONGODB_DOCKER_PORT, 10) || 5432,
  },
});
