"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path_1.default.dirname(__filename);
var router = (0, express_1.Router)();
var routesPath = __dirname;
fs_1.default.readdirSync(routesPath).forEach(function (file) {
    var isRouteFile = file.endsWith('Route.ts') || file.endsWith('Route.js');
    var isSelf = file === __filename;
    if (!isRouteFile || isSelf)
        return;
    var fullPath = path_1.default.join(routesPath, file);
    try {
        var routeModule = require(fullPath);
        var route = routeModule.default;
        if ((route === null || route === void 0 ? void 0 : route.path) && (route === null || route === void 0 ? void 0 : route.router)) {
            router.use(route.path, route.router);
            console.log("\u2705 Route loaded: ".concat(file, " => ").concat(route.path));
        }
        else {
            console.warn("\u26A0\uFE0F  Skipped: ".concat(file, " - Missing \"path\" or \"router\" export."));
        }
    }
    catch (err) {
        console.error("\u274C Error loading ".concat(file, ": ").concat(err.message));
    }
});
exports.default = router;
