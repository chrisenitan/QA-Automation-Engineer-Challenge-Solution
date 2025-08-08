import 'dotenv/config';

export type Systems = 'desktopApp' | 'api';

/**
 * Defaults to limehome production env
 */
export const baseUrls: Record<Systems, Record<string, string>> = {
  desktopApp: {
    staging: 'https://www.limehome.com',
    local: 'https://www.limehome.com',
    prod: 'https://www.limehome.com'
  },
  api: {
    staging: 'https://api.limehome.com/properties/v1/public/',
    local: 'https://api.limehome.com/properties/v1/public/',
    prod: 'https://api.limehome.com/properties/v1/public/'
  }
};
