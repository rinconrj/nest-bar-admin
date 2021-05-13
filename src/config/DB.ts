export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    Username: process.env.MONGO_USER,
    Password: process.env.MONGO_PASS,
  },
});
