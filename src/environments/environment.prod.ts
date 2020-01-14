const baseUri = `http://localhost`;
const port = '8080';

export const environment = {
  production: true,
  environmentName: 'Production Environment',
  userUri: `${baseUri}:${port}/users/`,
  batchesUri: `${baseUri}:${port}/batches/`,
  carUri: `${baseUri}:${port}/cars/`,
};
