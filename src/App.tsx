import 'antd/dist/antd.min.css';
import './App.css';
import Demo from './Demo';
import {Provider} from 'react-redux';
import store from './storing/store';
import { PersistGate } from "redux-persist/integration/react";

function App() {


  return (
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <Demo/>
      </PersistGate>
    </Provider>
  );
}

export default App;
