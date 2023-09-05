import  { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import { persistStore, persistReducer } from "redux-persist";
import  storage  from 'redux-persist/lib/storage';
import createTransform from "redux-persist/es/createTransform";

const transform = createTransform(null, null, {
    whitelist: ["authReducer"]
});

const reducer = combineReducers({
    authReducer,
});

const presistConfig = {
    key: "root",
    storage,
    transform: transform,
};

const persistedReducer = persistReducer(presistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools:process.env.NODE_ENV != "production"
});

export default store;





