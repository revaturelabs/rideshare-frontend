/**
 * This is the base URI
 */
const baseUri = `http://54.172.17.158`;

export const environment = {
  /**
   * These are the dev environment variables
   */
  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}/users/`,
  batchesUri: `${baseUri}/batches/`,
  carUri: `${baseUri}/cars/`,
};