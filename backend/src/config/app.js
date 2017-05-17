/**
 * Constant configuration of the application
 */

import { HOST, PORT, ENV } from './env';

export const isProduction   = ENV === 'production';
export const isDebug        = ENV === 'development';
export const isClient       = typeof window !== 'undefined';

export const baseURL        = `http://${HOST}:${PORT}`;

export const remoteUrl1     = '';
export const remoteUrl2     = '';
export const localFile      = './src/server/static/files/local-file';