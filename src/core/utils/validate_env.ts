import { cleanEnv, str, num, bool } from "envalid"

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: num(),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    JWT_SECRET: str(),
    MONGODB_URI: str({ default: '' }),
  });
};

export default validateEnv;