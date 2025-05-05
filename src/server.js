"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./config/env");
var app_1 = require("./app");
var PORT = env_1.env.APP_PORT;
app_1.default.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running on http://localhost:".concat(PORT));
});
