import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from '../features/alertSlice';
import { userSlice } from './userSlice';

export default configureStore({
    reducer: {
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
    },
});
