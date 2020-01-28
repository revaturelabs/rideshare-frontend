/**
 * This is the base URI
 */
const baseUri = `http://54.172.17.158`;

  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}/users/`,
  batchesUri: `${baseUri}/batches`,
  carUri: `${baseUri}/cars/`,
  adminUri: `${baseUri}/admins/`
};