import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  fileServerFolder: '.',
  fixturesFolder: 'src/fixtures',
  modifyObstructiveCode: false,
  video: false,
  downloadsFolder: '../../dist/cypress/apps/frontend/downloads',
  chromeWebSecurity: false,
  viewportHeight: 768,
  viewportWidth: 1024,
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run frontend:serve:development',
        production: 'nx run frontend:serve:production',
      },
      ciWebServerCommand: 'nx run frontend:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
