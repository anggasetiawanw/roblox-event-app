module.exports = {
  apps: [
    {
      name: 'roblox-event-api',
      script: 'dist/main.js',
      instances: 'max', // use all CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
