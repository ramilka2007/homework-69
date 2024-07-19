import { CurrentShow, Show } from '../types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface ShowState {
  shows: Show[];
  currentShow: CurrentShow;
  isLoading: boolean;
  isError: boolean;
}

export const initialState: ShowState = {
  shows: [],
  currentShow: {
    name: '',
    summary: '',
    image: '',
  },
  isLoading: false,
  isError: false,
};

export const fetchShows = createAsyncThunk<void, string>(
  'show/fetchShows',
  async (name: string) => {
    const { data: show } = await axiosApi.get<Show[] | null>(
      'search/shows?q=' + name,
    );
    if (show) {
      return show;
    } else {
      return null;
    }
  },
);

export const fetchCurrentShow = createAsyncThunk<void, string>(
  'show/fetchCurrentShow',
  async (id: string) => {
    const { data: currentShow } = await axiosApi.get<CurrentShow[] | null>(
      `/shows/${id}`,
    );
    return currentShow || null;
  },
);

export const showSlice = createSlice({
  name: 'show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state: ShowState) => {
        state.isLoading = true;
      })
      .addCase(fetchShows.fulfilled, (state: ShowState, action) => {
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
        state.isLoading = false;
      })
      .addCase(fetchShows.rejected, (state: ShowState) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(
        fetchCurrentShow.fulfilled,
        (state: ShowState, { payload: info }: PayloadAction<CurrentShow>) => {
          if (info) {
            state.currentShow = {
              name: info.name,
              image: info.image.original,
              summary: info.summary,
            };
          }
        },
      )
      .addCase(fetchCurrentShow.rejected, (state: ShowState) => {
        state.isError = true;
      });
  },
});

export type { ShowState };
export const showReducer = showSlice.reducer;
