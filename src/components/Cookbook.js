//src/components/Cookbook.js
import React from 'react';
import Recipe from './Recipe';
import { Link } from 'react-router';

export default class Cookbook extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            recipes: []
        };
    }
    
    componentDidMount() {
        this.getRecipes();
    }
    
    getRecipes() {
        return $.getJSON('./recipes').then((data) => {
            
            var dataFull = [];
            for (var i = 0; i < data.length; i++) {
                var partData = data[i];
                partData.ingredients = JSON.parse(partData.ingredients);
                dataFull.push(partData);
            }
            
            this.setState({ recipes: dataFull });
        });        
    }
    
    render() {
        var recipe_comps = this.state.recipes.map(recipeData => <Recipe key={recipeData.rid} {...recipeData} />);
        return (
            <div id="cookbook" className="container">
                {recipe_comps}
                <Link to={'/add'}>
                    <li className="btn btn-primary">Add recipe</li>
                </Link>
                <div className="navigateBack">
                    <Link to="/">« Back to main menu</Link>
                </div>
            </div>
        );
    }
}