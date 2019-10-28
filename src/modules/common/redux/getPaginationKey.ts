import { stringify } from 'qs';

export const getPaginationKey = (options: Object = {}) => stringify(options) || 'default';
