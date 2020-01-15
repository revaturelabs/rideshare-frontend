/**
 * This is the base URI
 */
const baseUri = `http://localhost`;

/**
 * Set the port var
 */
const port = '8080';

  /**
 * These are the constants for the production config
 */

export const environment = {

  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
};
