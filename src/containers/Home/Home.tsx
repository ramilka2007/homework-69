import React from 'react';
import './Home.css'
import {NavLink} from "react-router-dom";

const Home = () => {
    const [name, setName] = React.useState({
        showName: ''
    });

    const [shows, setShows] = React.useState(['katy perry', 'marry derry']);

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
  return (
      <div className="d-flex">
          <div className="search w-50 text-end pe-5">
              <h2>Search for TV show:</h2>
          </div>
          <div className="w-50 position-relative">
              <div className="text-start">
                  <input type="text" id="showName" name="showName" value={name.showName} className="w-75 mt-1"
                         onChange={changeName}/>
              </div>
              <div className='info position-absolute'>
                  <ul className="chooser border border-2 list-inline h-100">
                      {shows.map((show) => (
                          <>
                              <li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li><li>
                                  <NavLink to="/">
                                      {show}
                                  </NavLink>
                              </li>
                          </>

                      ))}
                  </ul>
              </div>
          </div>
      </div>
  );
};

export default Home;
