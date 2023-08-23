import { createSlice } from '@reduxjs/toolkit';

type SidebarModel = {
  show: boolean;
};

const initialState: SidebarModel = {
  show: false,
};

const sidebarModel = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle: (state) => {
      const isOpen = state.show;
      if (!isOpen) {
        document.body.style.overflow = 'hidden';
      }
      state.show = !isOpen;
    },
    close: (state) => {
      state.show = false;
      document.body.style.overflow = 'auto';
    },
  },
});

export const actions = sidebarModel.actions;

export const reducer = sidebarModel.reducer;
