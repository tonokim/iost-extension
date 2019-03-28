import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './containers/App';
import style from './style.less'

import RootStore from "./stores";

ReactDOM.render(
  <Provider rootStore={new RootStore()}>
    <App />
  </Provider>, 
  document.getElementById('root')
)