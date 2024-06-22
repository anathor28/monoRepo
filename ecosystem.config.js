module.exports = {
    apps: [
      {
        name: process.env.SERVICE_NAME || 'default',
        script: `apps/${process.env.SERVICE_NAME}/dist/main.js`,
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };