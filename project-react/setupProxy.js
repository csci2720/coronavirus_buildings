const proxy = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        proxy("/api/admin/loadData", {
            target: "http://localhost:3000",
            changeOrigin: true
        })
    );
};