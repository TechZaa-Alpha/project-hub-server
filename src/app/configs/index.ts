import "dotenv/config";

export const configs = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwt: {
    access_token: process.env.ACCESS_TOKEN,
    access_expires: process.env.ACCESS_EXPIRES,
    reset_secret: process.env.RESET_SECRET,
    reset_expires: process.env.RESET_EXPIRES,
    front_end_url: process.env.FRONT_END_URL,
    verified_token: process.env.VERIFIED_TOKEN,
  },
  db_url: process.env.DB_URL,
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    cloud_api_key: process.env.CLOUD_API_KEY,
    cloud_api_secret: process.env.CLOUD_API_SECRET,
  },
  mailgun: {
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASSWORD,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};
