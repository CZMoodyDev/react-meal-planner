//src/components/CreateList.js
import React from 'react';
import { Link } from 'react-router';
import RecipeLite from './RecipeLite';

export default class CreateList extends React.Component {
    constructor() {
        super();
        this.state = {
            cart: {},
            recipes: [],
            recipeLookup: {},
            shopping_list: {},
            cartStr: ""
        }
    }
    
    componentDidMount() {
        this.getRecipes();
    }
    
    getRecipes() {
        $.ajax({
            url: './recipes',
            context: this,
            success: function(data) {
                this.setState({recipes: data});

                for (var i = 0; i < this.state.recipes.length; i++) {
                    var recipe = this.state.recipes[i];
                    var newLookup = this.state.recipeLookup;
                    
                    newLookup[recipe.rid.toString()] = recipe;
                    this.setState({recipeLookup: newLookup});
                }
                
                console.log(this.state.recipeLookup);
            }   
        });      
    }  
    
    addToCart(recipeName, rid) {
        
        var newCart = this.state.cart;
        
        if (newCart.hasOwnProperty(recipeName)) {
            newCart[recipeName].count++;
        } else {
            newCart[recipeName] = {
                'rid': rid,
                'count': 1
            };
        }
        
        this.setState({cart: newCart});
    }
    
    dropFromCart(recipeName) {
        
        var newCart = this.state.cart;
        
        if (newCart.hasOwnProperty(recipeName)) {
            newCart[recipeName].count--;
            
            if (newCart[recipeName].count == 0) {
                delete newCart[recipeName];
            }
            
        }
        
        this.setState({cart: newCart});
    }    
    
    render() {
        var meal_shopping_list = (<div></div>);
        var inst_list = (<div></div>);
        var cartKeys = Object.keys(this.state.cart);
        var master_shopping_list = {};
        if (cartKeys.length > 0 && this.state.recipeLookup != undefined) {

            var cart = this.state.cart;
            var li = [];
            var m_inst_list = [];
            
            for (var i = 0; i < cartKeys.length; i++) {
                //Meals Listing
                var mealName = cartKeys[i];
                var numMeals = cart[cartKeys[i]].count;
                var liCont = mealName + " x" + numMeals;
                li.push(<li>{liCont}</li>);
             
                //Add those meals to master_shopping_list
                var recipeData = this.state.recipeLookup[cart[mealName]['rid'].toString()];

                for (var j = 0; j < numMeals; j++) {
                    var rdIngredients = JSON.parse(recipeData['ingredients']);
                    for (var k = 0; k < rdIngredients.length; k++) {
                        
                        var iName = rdIngredients[k]['iName'];
                        var unit = rdIngredients[k]['unit'];
                        var measure = rdIngredients[k]['measure'];
                        
                        if (!master_shopping_list.hasOwnProperty(iName)) {
                            master_shopping_list[iName] = {};
                        }
                        
                        if (!master_shopping_list[iName].hasOwnProperty(unit)) {
                            master_shopping_list[iName][unit] = 0;
                        }

                        master_shopping_list[iName][unit] += parseFloat(measure);
                        
                    }
                }

                //Instructions Listing
                
                var cookComp = recipeData['cook-inst'];
                
                inst_list = (
                    <div>
                        <h3>{recipeData.name}</h3>
                        <p><strong>{recipeData['prep-inst']}</strong><br />{cookComp}<br /><i>{recipeData['serve-inst']}</i></p>
                    </div>
                );
                
                m_inst_list.push(inst_list);
            }
            
            meal_shopping_list = (<ul>{li}</ul>);
            
            master_shopping_list = Object.keys(master_shopping_list).sort().reduce((r, k) => (r[k] = master_shopping_list[k], r), {});
            var ingredients = Object.keys(master_shopping_list);
            var shopLi = [];
            
            for (var i = 0; i < ingredients.length; i++) {
                var units = Object.keys(master_shopping_list[ingredients[i]]);
                var fullUnits = [];
                
                for (var j = 0; j < units.length; j++) {
                    var fullMeasure = Math.round(master_shopping_list[ingredients[i]][units[j]] * 100) / 100;
                    fullUnits.push(fullMeasure.toString() + units[j]);
                }
                
                var fullIngredient = ingredients[i] + ": " + fullUnits.join(" + ");
                shopLi.push((<li>{fullIngredient}</li>));
            }
            
            var compShop = (<ul>{shopLi}</ul>);
            
            console.log(this.state);
        }
        
        
        
        return (
            <div>
                <div id="create-list" className="row row-eq-height">
                    <div id="recipe-lite" className="col-md-6">
                        {this.state.recipes.map(recipeData => <RecipeLite key={recipeData.rid} dropFromCart={this.dropFromCart.bind(this)} addToCart={this.addToCart.bind(this)} {...recipeData} />)}
                    </div>
                    <div id="recipe-list" className="col-md-6">
                        {meal_shopping_list}
                    </div>
                </div>
                <div>
                    <h1>Instructions</h1>
                    {m_inst_list}
                    <h1>Shopping List</h1>
                    {compShop}
                </div>
                 <div className="navigateBack">
                    <Link to="/">« Back to main menu</Link>
                </div>
            </div>
        );
    }
}