import { createSlice } from "@reduxjs/toolkit";

const photoSlice = createSlice({
  name: "photos",
  initialState: {
    images: [],
    page: 1,
    selectedIndex: null,
  },
  reducers: {
    loadMoreImages: (state) => {
      const start = (state.page - 1) * 30 + 1;
      for (let i = 0; i < 30; i++) {
        state.images.push(start + i);
      }
      state.page += 1;
    },
    setSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload;
    },
    closeModal: (state) => {
      state.selectedIndex = null;
    },
  },
});

export const { loadMoreImages, setSelectedIndex, closeModal } =
  photoSlice.actions;

export default photoSlice.reducer;
