/**
 * This is the base URI
 */
const baseUri = `http://localhost`;
const port = '8080';

export const environment = {
  /**
 * These are the constants for the production config
 */
  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
};
