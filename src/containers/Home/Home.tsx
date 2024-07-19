import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows } from '../../store/showSlice';
import { AppDispatch, RootState } from '../../app/store';
import { Autocomplete, TextField } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const shows = useSelector((state: RootState) => state.show.shows);

  const showSelector = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(fetchShows(event.target.value));
  };

  const selectShow = (e: SyntheticEvent<Element, Event>, id: string) => {
    navigate('/shows/' + id);
  };

  return (
    <div>
      <div className="d-flex">
        <div className="search w-50 text-end pe-5">
          <h2>Search for TV show:</h2>
        </div>
        <div className="w-50">
          <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            options={shows}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(e, value) => selectShow(e, value!.id)}
            renderInput={(params) => (
              <TextField
                onChange={(e) => showSelector(e)}
                {...params}
                label="TV shows"
              />
            )}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
