import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'tttgame',
  exposes: {
    './Routes': 'apps/tttgame/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
