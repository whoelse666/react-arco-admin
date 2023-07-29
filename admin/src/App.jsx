import './App.css';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import { IconDashboard, IconEmail } from '@arco-design/web-react/icon';

import ReactIcon from './assets/react.svg';
import { Button, Icon } from '@arco-design/web-react';
const IconFont = Icon.addFromIconFontCn({
  src: '//sf1-cdn-tos.toutiaostatic.com/obj/iconfont/index_8132353a46ca4ac1314b8903202269af.js',
});
<IconFont type="icon-person" style={{ fontSize: 40, marginRight: 40 }} />;
import { useMemo } from 'react';
import { getFlattenRoutes, routes } from './routes';
function App() {
  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/dashboard">
            <IconDashboard></IconDashboard>
            <ReactIcon></ReactIcon>
            <IconFont
              type="icon-person"
              style={{ fontSize: 40, marginRight: 40 }}
            />
            <Button type="primary">dashboard</Button>
            <Button type="primary">dashboard</Button>
          </Link>
          <br />

          <Link to="/example">
            <IconEmail></IconEmail>
            <Button type="primary">example</Button>
          </Link>
        </nav>
        ;
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
