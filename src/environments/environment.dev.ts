/**
 * This is the base URI
 */
<<<<<<< HEAD
const baseUri = `http://localhost`;
=======
const baseUri = `http://localhost:8080`;
>>>>>>> 97cd434feda233f12368e4e5692cfae7bef50e84

const port = '8080';
  /**
   * These are the dev environment variables
   */
export const environment = {

  production: false,
  environmentName: 'Default Dev Environment',
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}/batches`,
  carUri: `${baseUri}:${port}/cars/`,
  adminUri: `${baseUri}:${port}/admins/`
};