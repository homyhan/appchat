import logo from './logo.svg';
import './App.css';
import ChatMain from './features/Chat/ChatMain';
import Singin from './features/Auth/Singin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RouteComponent from './HOCs/RouteComponent';

function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={<RouteComponent Component={Singin} />}
        ></Route>
        <Route
          path="/chat"
          element={
            <RouteComponent
              Component={ChatMain}
              isLogin={true}
              redirectPath="/"
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
