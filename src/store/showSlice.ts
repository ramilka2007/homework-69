import {CurrentShow, Show} from '../types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface ShowState {
  shows: Show[];
  currentShow: CurrentShow;
}

export const initialState: ShowState = {
  shows: [],
  currentShow: {
    name: '',
    summary: '',
    image: '',
  },
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

export const fetchCurrentShow = createAsyncThunk<void, string>('show/fetchCurrentShow', async (id: string) => {
  const {data: currentShow} = await axiosApi.get<Show[]>(`/shows/${id}`);
  console.log(currentShow);
  return currentShow || null;
})

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

    builder.addCase(fetchCurrentShow.fulfilled, (state: ShowState, action) => {
      if(action.payload) {
        state.currentShow = {
          name: action.payload.name,
          image: action.payload.image.original,
          summary: action.payload.summary,
      }
      }
    })
  },
});

export type { ShowState };
export const showReducer = showSlice.reducer;
