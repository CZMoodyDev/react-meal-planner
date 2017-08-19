// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import FinalList from './components/FinalList';
import CreateList from './components/CreateList';
import DeleteRecipe from './components/DeleteRecipe';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';
import Cookbook from './components/Cookbook';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="cookbook" component={Cookbook}/>
    <Route path="create-list" component={CreateList}/>
    <Route path="delete-recipe/:rid" component={DeleteRecipe}/> 
    <Route path="edit-recipe/:rid" component={EditRecipe}/>     
    <Route path="add" component={AddRecipe}/>   
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;