import React from 'react'
import ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import PromiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'

import App from './App'
import Reducer from './_reducers'

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)