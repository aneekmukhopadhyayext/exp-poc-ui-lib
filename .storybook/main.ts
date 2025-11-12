import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: (config) => {
    config.server = config.server || {};
    config.server.allowedHosts = [
      '0.0.0.0',
      'localhost',
      process.env.DDEV_HOSTNAME || '',
      process.env.DDEV_PRIMARY_URL || '',
    ].filter(host => host !== '');
    return config;
  },
};
export default config;