export const isPre = process.env.LOGIN_ENV === 'pre';
export const isDev = process.env.NODE_ENV === 'development';

export const apiPath = 'http://47.100.125.177:8082';

export enum CategoryItemType {
  process = 'process',
  circle = 'circle',
  text = 'text',
  processRange = 'processRange',
}

export enum progressType {
  noraml = 'noraml',
  lowRisk = 'lowRisk',
  highRisk = 'highRisk',
}

export enum NewItemType {
  process = 'process',
  circle = 'circle',
  text = 'text',
  processRange = 'processRange',
}
