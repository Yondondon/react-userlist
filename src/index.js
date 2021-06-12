import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

//Styles
import './index.scss';

//Components
import Main from "./components/Main";
import NewUser from "./components/NewUser/App";
import EditUser from "./components/EditUser/App";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/new_user' component={NewUser} />
        <Route path='/edit_user' component={EditUser} />
        <Route exact path='/' component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);