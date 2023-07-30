import './App.css';
import { BrowserRouter } from 'react-router-dom';

import MyLayout from './layout';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyLayout></MyLayout>
        {/* <nav>
          <Link to="/dashboard">
            <IconDashboard></IconDashboard>
            <ReactIcon></ReactIcon>
            <IconFont
              type="icon-person"
              style={{ fontSize: 40, marginRight: 40 }}
            />
            <Button type="primary">dashboard</Button>
          </Link>
          <br />

          <Link to="/example">
            <IconEmail></IconEmail>
            <Button type="primary">example</Button>
          </Link>
        </nav>
  
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
        </Routes> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
