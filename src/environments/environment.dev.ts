/**
 * This is the base URI
 */
const baseUri = `http://localhost`;

const port = '8080';
  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}:${port}/users/`,
  loginUri: `${baseUri}:${port}/login/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`
};