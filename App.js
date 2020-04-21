import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {reducer,mergesqliteandredux} from './reducer'
import LoginAreaStack from './src/Components/LoginAreaStack';

const store = createStore(reducer) //STORE CONNECTION

class App extends React.Component {
  componentDidMount(){
    mergesqliteandredux()
  }
  render() {
    return (
      <Provider store={store}>
        <LoginAreaStack />
      </Provider>
    )
  }
}
export default App;
