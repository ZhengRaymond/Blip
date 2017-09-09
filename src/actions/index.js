import axios from 'axios';

export const GET_BLIPS = 'GET_BLIPS';
export const GET_BLIP = 'GET_BLIP';

const ROOT_URL = 'http://localhost:3000';

export function getBlips() {
  const request = axios.get(`${ROOT_URL}/blips`);

  return {
    type: GET_BLIPS,
    payload: request
  };
}
