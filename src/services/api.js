import { create } from 'apisauce';

const api = create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default api;
