import NotFound from '@app/pages/Error/NotFound';
import { Route } from '@app/router/router';
import AppLayout from '@app/layouts/AppLayout';
import Home from '@app/pages/Home.tsx';

export const routes: Array<Route> = [
  {
    path: '/',
    layout: AppLayout,
    component: Home,
  },
  /* Error pages */
  {
    path: '*',
    component: NotFound,
  },
];

export default routes;

