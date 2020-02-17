/**
 * This is the base URI
 */
const baseUri = ``;

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
  loginUri: `${baseUri}:${port}/login/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`
};
