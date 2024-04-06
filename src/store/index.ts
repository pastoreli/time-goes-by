import { configureStore } from '@reduxjs/toolkit';

import { alarmDefinitionReducer, layoutReducer } from './reducers';

const store = configureStore({
  reducer: {
    alarmDefinition: alarmDefinitionReducer,
    layout: layoutReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
