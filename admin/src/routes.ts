import { lazy, Suspense } from 'react';

export const routes = [
  {
    name: 'menu.dashboard',
    key: 'dashboard',
  },
  {
    name: 'Example',
    key: 'example',
  },
];

export function getFlattenRoutes(routes) {
  const res = [] as any;
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        // const Component = lazy(() => import(`./pages/${route.key}.tsx`));
       route.component = lazy(() => import(`./pages/${route.key}.tsx`));
        // route.component = (
        //   <Suspense>
        //     <Component /> 
        //   </Suspense>
        // );

        res.push(route);
      } else if (Array.isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}
