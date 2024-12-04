const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // API 경로에 따라 프록시 설정
  const services = [
    { path: '/api/v1/users', target: 'http://picktartup.local:32450/user' },
    { path: '/api/v1/coins', target: 'http://picktartup.local:32450/coin' },
    { path: '/api/v1/startups', target: 'http://picktartup.local:32450/startup' },
    { path: '/api/v1/wallets', target: 'http://picktartup.local:32450/wallet' },
    { path: '/api/v1/contracts', target: 'http://picktartup.local:32450/contract' },
    { path: '/api/v1/admin', target: 'http://picktartup.local:32450/admin' },
  ];

  services.forEach(({ path, target }) => {
    app.use(
      path,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
          [`^${path}`]: '', 
        },
      })
    );
  });
};
