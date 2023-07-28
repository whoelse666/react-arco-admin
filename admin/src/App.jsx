import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { useMemo } from 'react';
import { getFlattenRoutes, routes } from './routes';
function App() {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {flattenRoutes.map((route) => {
            return (
              <Route
                key={route.key}
                path={`/${route.key}`}
                element={route.component}
              />
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
