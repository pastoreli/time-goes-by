import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type LayoutReducerProps = {
  tabBarVisible: boolean;
};

const initialState: LayoutReducerProps = {
  tabBarVisible: true,
};

const layoutReducer = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showTabBar: (state, action: PayloadAction<boolean>) => {
      state.tabBarVisible = action.payload;
    },
  },
});

export const { showTabBar } = layoutReducer.actions;

export default layoutReducer.reducer;
