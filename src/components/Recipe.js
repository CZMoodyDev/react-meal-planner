//src/components/Recipe.js
import React from 'react';
import { Link } from 'react-router';
import Ingredient from './Ingredient';

export default class Recipe extends React.Component {
        
    render() {
        var recID = "rec" + this.props.rid;
        var recIDHREF = "#" + recID;
        
        var prep = this.props['prep-inst'].split(".");
        var cook = this.props['cook-inst'].split(".");
        var serv = this.props['serve-inst'].split(".");
        
        var formatPrep = [];
        var formatCook = [];
        var formatServ = [];
        
        for (var i = 0; i < prep.length; i++) {
            var x = prep[i];
            formatPrep.push(<p>{x}<br /></p>);
        }
        for (var i = 0; i < cook.length; i++) {
            var x = cook[i];
            formatCook.push(<p>{x}<br /></p>);
        }
        for (var i = 0; i < serv.length; i++) {
            var x = serv[i];
            formatServ.push(<p>{x}<br /></p>);
        }        
                
        return (
            <div className="single-leaf">
                <a href={recIDHREF} className="btn btn-info rec-sec center-block" data-toggle="collapse">{this.props.name}</a>
                <div id={recID} className="collapse">
                    <h3 className="rec-header">Ingredients</h3>
                    <ul className="ingredient-list">
                        {this.props.ingredients.map(ingredientData => <Ingredient {...ingredientData} />)}
                    </ul>
                    <h3 className="rec-header">Instructions</h3>
                    <div className="prep-inst"><strong>{formatPrep}</strong></div>
                    <div className="cook-inst">{formatCook}</div>
                    <div className="serve-inst"><i>{formatServ}</i></div>
                    <Link to={`/edit-recipe/${this.props.rid}`}>
                        <li className="btn btn-primary">Edit recipe</li>
                    </Link>
                    <Link to={`/delete-recipe/${this.props.rid}`}>
                        <li className="btn btn-danger" role="button">Delete recipe</li>
                    </Link>

                </div>
            </div>
        );
    }
}