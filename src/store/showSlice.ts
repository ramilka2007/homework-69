import { Show } from '../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface ShowState {
  shows: Show[];
}

export const initialState: ShowState = {
  shows: [],
};

export const fetchShows = createAsyncThunk<void, string>(
  'show/fetchShows',
  async (name: string) => {
    const { data: show } = await axiosApi.get<Show[]>('search/shows?q=' + name);
    if (show) {
      return show;
    } else {
      return null;
    }
  },
);

export const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShows.fulfilled, (state: ShowState, action) => {
      const allShows: Show[] = [];

      if (action.payload) {
        for (const [_, value] of Object.entries(action.payload)) {
          allShows.push({
            id: value.show.id,
            name: value.show.name,
          });
        }
      }

      state.shows = allShows;
    });
  },
});

export type { ShowState };
export const showReducer = showSlice.reducer;
