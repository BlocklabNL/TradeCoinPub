const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/vault',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            pathRewrite: {
                '^/api/vault':'' //remove /api/vault
            },
            changeOrigin: true,
        })
    );
    // app.use(
    //     '/api/auth',
    //     createProxyMiddleware({
    //         target: 'http://localhost:8000',
    //         changeOrigin: true,
    //     })
    // );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3030',
            pathRewrite: {
                '^/api':'' //remove /api
            },
            changeOrigin: true,
        })
    );
};
