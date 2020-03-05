import Axios from 'axios';

import { api as apiConfig } from '../../config';

const api = Axios.create({
    baseURL: apiConfig.url
});

export default api;