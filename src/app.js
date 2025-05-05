"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var path_1 = require("path");
var routes_1 = require("./routes");
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.status(200).send('Hellos!');
});
// 404 handler
app.use(function (req, res) {
    res.status(404).json({
        status: false,
        message: 'Page not found!',
    });
});
// global error handler
app.use(function (err, req, res, next) {
    console.error('Global Error:', err.message);
    res.status(500).json({
        status: false,
        message: err.message || 'Internal Server Error'
    });
});
exports.default = app;
