import *as ReactDOM from 'react-dom';
import *as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Layout from './layout/index';
import ButtonPage from './buttonPage/index';
import IconPage from './iconPage/index';
import AnimationPage from './animationPage/index';
import gridPage from './gridPage/index';
import notificationPage from './notificationPage/index';
import inputPage from './inputPage/index';
import pagerPage from './pagerPage/index';
import animationPage from './animationPage/index';
 
import 'antd/dist/antd.css';
import "./index.less";

ReactDOM.render((<HashRouter>
        <Route path="/" exact component={animationPage} />
        <Route path="/animation" exact component={animationPage} />
        <Route path="/pager" exact component={pagerPage} />
        <Route path="/notification" exact component={notificationPage} />
        <Route path="/button" component={ButtonPage}></Route>
        <Route path="/layout" component={Layout}></Route>
        <Route path="/icon" component={IconPage}></Route>
        <Route path="/animation" component={AnimationPage}></Route>
        <Route path="/grid" component={gridPage}></Route>
        <Route path="/input" component={inputPage}></Route>
</HashRouter>), document.getElementById("root"));