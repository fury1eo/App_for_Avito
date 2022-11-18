import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Posts from '../pages/posts/posts';
import Navbar from '../components/navbar/navbar';
import PostPage from '../pages/postPage/postPage';


const App = () => {
    return (
        <Router>
            <Navbar/>
            <Switch>
                <Route exact path='/posts'>
                    <Posts/>
                </Route>
                <Route exact path='/posts/:id'>
                    <PostPage/>
                </Route>
                <Redirect to='/posts'/>
            </Switch>
        </Router>
    );
};

export default App;