'use strict';
import app from './src/app.js'
import Logger from "./src/Logger";
const apiServerPort = require("./src/config").apiServerPort;

app.listen(apiServerPort, () =>
    Logger.log(`Expense tracker app listening on port ${apiServerPort}!`));
