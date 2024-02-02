import {configureStore} from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer, 
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, 
    },

    
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoNewsApi.middleware),instead of this, both should be concatenated in the same thing

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cryptoApi.middleware, cryptoNewsApi.middleware),
});