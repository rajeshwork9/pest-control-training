import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.psd.training',
  appName: 'PSD Training App',
  webDir: 'dist',
  plugins: {
    App: {
      deepLinkScheme: 'psdapp', // Custom scheme for deep linking
    }
  }
};

export default config;