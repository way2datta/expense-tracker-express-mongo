const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
export const apiServerPort = process.env.PORT;

const dbConnectionString = process.env.DB_CONNECTION_STRING;

export const databaseConnectionString = dbConnectionString;

const uiHosts = process.env.UI_HOSTS;
export const uiAppUrls = uiHosts.split(',');
