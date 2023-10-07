import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { Root } from '@/components/core/root';
import { Home } from '@/screens/home';
import {
  CalendarNotOptimized,
  CalendarOptimizedWithMemoization,
  CalendarOptimizedWithStore,
} from '@/screens/calendar';
import {
  FormNotOptimized,
  FormOptimizedWithEncapsulation,
  FormOptimizedWithUncontrolled,
} from '@/screens/form';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      // home
      {
        index: true,
        element: <Home />,
      },
      // calendar
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
      // form
      {
        path: 'form-not-optimized',
        element: <FormNotOptimized />,
      },
      {
        path: 'form-optimized-encapsulation',
        element: <FormOptimizedWithEncapsulation />,
      },
      {
        path: 'form-optimized-uncontrolled',
        element: <FormOptimizedWithUncontrolled />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
