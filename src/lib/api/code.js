import client from './client';

export const payType = () => client.get(`/api/code/payType`);
