import 'antd/dist/antd.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './view/Demo';
import Bookmarks from './view/Bookmarks';
import NavbarHeader from './component/navbar';
import FooterLayout from './component/footer';
import { Layout } from 'antd';
import {Provider} from 'react-redux';
import store from './storing/store';
import { PersistGate } from "redux-persist/integration/react";

function App() {


  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Router>
          <Layout>
            <NavbarHeader/>
              <Routes>
                <Route path='/' element={<Demo/>}/>
                <Route path='/bookmarks' element={<Bookmarks/>}/>
              </Routes>
            <FooterLayout/>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
