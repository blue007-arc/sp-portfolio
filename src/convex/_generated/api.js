/* eslint-disable */
export const api = new Proxy({}, {
  get: () => new Proxy({}, {
    get: () => () => ({})
  })
});
export const internal = api;