import './index.css';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { startNewPuzzle } from './actionCreators'
import appReducer from './reducers'
import Root from './components/Root'
import React from 'react'

import { render } from 'react-dom'

const loggerMiddleware = createLogger()

const initialState = {

    gridSize: 4,
    tiles: null,
    solution: null,
    isSolving: false,
    showNext: false,
    isShowingSolution: false,
    dragIndex: null,
    dragStart: null,
    dragArea: null,
    dropIndex: null

}

const store = createStore(
    appReducer,
    initialState,
    applyMiddleware(
        thunkMiddleware
        //loggerMiddleware
    )
)

store.dispatch(startNewPuzzle(4));

render(
    <Root store={store} />,
    document.getElementById('root')

);


