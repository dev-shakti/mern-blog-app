import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers
const rootReducer = combineReducers({ 
    auth: authReducer,
})

// Persist config
const persistConfig = {
    key: "root",
    storage,
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false, // ✅ Fix redux-persist serialization issue
        }),
})

// Persistor
export const persistor = persistStore(store);
export default store;