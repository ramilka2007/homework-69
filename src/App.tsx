import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import { Link, Route, Routes } from 'react-router-dom';
import CurrentShow from './components/CurrentShow/CurrentShow';

const App = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows" element={<Home />}>
            <Route path=":id" element={<CurrentShow />} />
          </Route>
          <Route
            path="*"
            element={
              <div>
                <h1 className={'mt-5 text-danger'}>Not found!</h1>
                <Link to="/" className={'btn btn-danger'}>
                  Go back!
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
