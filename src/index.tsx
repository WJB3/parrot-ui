import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './home2/index';
import Layout from './layout/index';
import ButtonPage from './buttonPage/index';
import TablePage from './tablePage/index';
import 'antd/dist/antd.css';
import "./index.less";

ReactDOM.render((<HashRouter>
 
        <Route path="/" exact component={ButtonPage}>
              
        </Route>
        <Route path="/button" component={ButtonPage}></Route>
        <Route path="/button" component={TablePage}></Route>
        <Route path="/layout" component={Layout}></Route>
 
</HashRouter>), document.getElementById("root"));