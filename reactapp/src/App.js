import React from 'react';
import {connect} from 'react-redux';
import Icon from '@ant-design/icons';
import './App.css';
import ScreenHome from './components/ScreenHome';
import ScreenMyArticles from './components/ScreenMyArticles';
import ScreenArticlesBySource from './components/ScreenArticlesBySource';
import ScreenSource from './components/ScreenSource';
import serviceWorker from './serviceWorker';
import setupTests from './setupTests';
import Nav from './components/Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import wishList from './reducers/article.reducer';
import token from './reducers/user.reducer';
import lang from './reducers/lang.reducer';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';


const store = createStore(combineReducers({wishList, token,lang}));


function App() {

  return (
    <Provider store={store}>
    <Router>  
        <Switch>
            <Route exact path ="/"  component={ScreenHome}/>
            <Route path="/myArticles" component={ScreenMyArticles}/>
            <Route path="/ArticlesBySource/:id" component={ScreenArticlesBySource}/>
            <Route path="/source" component={ScreenSource}/>
        </Switch>
      </Router>
    </Provider>
  );
}



export default App;
