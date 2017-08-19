// src/components/DeleteRecipe.js
import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';

export default class DeleteRecipe extends React.Component {
  render() {
    const id = this.props.params.rid;
  
    $.ajax({
        type: "POST",
        url: "../delete?id=" + id
    });
    
    return (
      <div className="container">
        <p>Recipe deleted</p>
        <div className="navigateBack">
          <Link to="/cookbook">« Back to Cookbook</Link>
        </div>
      </div>
    );
  }
}