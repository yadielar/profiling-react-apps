import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import { Nav } from './components/Nav';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Nav />
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex place-content-center my-10">
            <a href="https://reactjs.org" target="_blank" rel="noreferrer">
              <img
                src={reactLogo}
                className="h-16 will-change-[filter] motion-safe:animate-spin-slow"
                alt="React logo"
              />
            </a>
          </div>
          <h1 className="text-5xl">Profiling React Apps</h1>
          <div>
            <ul>
              <li>
                <Link to="/calendar">Calendar</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    path: 'calendar',
    element: <div>Calendar</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
