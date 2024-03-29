import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envVarsSchema = Joi.object({
  PORT: Joi.string().default(5000).description("Port for Express App"),
  RPC: Joi.string().default("http://127.0.0.1:26657").description("Public RPC link for Namada CLI request"),
});

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) new Error(`Config validation error: ${error.message}`);

export default {
  port: envVars.PORT,
  rpc: envVars.RPC,
};
