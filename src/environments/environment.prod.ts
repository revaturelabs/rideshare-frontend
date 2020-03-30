/**
 * This is the base URI
 */
const baseUrl = `http://localhost`;

/**
 * Set the port var
 */
const port = '8080';

// combination of the base uniform resource locator and its port number
const url = `${baseUrl}:${port}`;

  /**
 * These are the constants for the production config
 */

export const environment = {

  production: true,
  environmentName: 'Production Environment',
  userUri: `${url}/users/`,
  loginUri: `${url}/login/`,
  batchesUri: `${url}/batches/`,
  carUri: `${url}/cars/`,
  adminUri: `${url}/admins/`,
  infoUri: `${url}/info/`
};
