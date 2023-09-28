import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Home } from '@/screens/home';
import {
  CalendarNotOptimized,
  CalendarOptimizedWithMemoization,
  CalendarOptimizedWithStore,
} from '@/screens/calendar';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'calendar-not-optimized',
    element: <CalendarNotOptimized />,
  },
  {
    path: 'calendar-optimized-memoization',
    element: <CalendarOptimizedWithMemoization />,
  },
  {
    path: 'calendar-optimized-store',
    element: <CalendarOptimizedWithStore />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
