import axiosClient from './axiosClient';

export const fetchApplications = (params) =>
  axiosClient.get('/applications', { params });

export const createApplication = (payload) =>
  axiosClient.post('/applications', payload);

export const updateApplication = (id, payload) =>
  axiosClient.put(`/applications/${id}`, payload);

export const deleteApplication = (id) =>
  axiosClient.delete(`/applications/${id}`);

