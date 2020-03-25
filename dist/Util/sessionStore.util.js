"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
exports.SessionStore = app => {
    app.use(session({ secret: 'langjie@network', cookie: { maxAge: 60 * 1000 }, resave: true, saveUninitialized: true }));
};
//# sourceMappingURL=sessionStore.util.js.map