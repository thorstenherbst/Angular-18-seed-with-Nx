import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'frontend',
  exposes: {
    './Routes': 'apps/frontend/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
