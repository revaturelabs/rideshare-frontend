/**
 * This is the base URI
 */
const baseUri = `http://54.174.82.153`;

const port = '8080';
  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}:${port}/batches`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`
};