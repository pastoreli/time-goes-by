import { configureStore } from '@reduxjs/toolkit';

import { alarmDefinitionReducer } from './reducers';

const store = configureStore({
  reducer: {
    alarmDefinition: alarmDefinitionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
