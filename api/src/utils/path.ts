import path from 'path';
export const sanitizePath = (pathObject: string) => {
  return path.normalize(pathObject).replace(/^(\.\.(\/|\\|$))+/, '');
};