//src/components/FinalList.js
import React from 'react';
import recipes from '../data/recipes';

export default class FinalList extends React.Component {
    render() {
        
        var ridLookup = {};
        for (var i = 0; i < recipes.length; i++) { //TODO: Do this up in recipes
            ridLookup[recipes[i][rid].toString()] = recipes[i];
        }
        
        const cart = this.props.params.cart;
        var instructions = {};
        var ingredientsToBuy = {};
        
        var order_list = "<ul>";

        Object.keys(cart).forEach(function(key) {
            order_list += "<li>" + key + " x " + cart.key.count + "</li>";
            
            instructions.key = [
                "<strong>"+ridLookup[cart.key.rid.toString()]['prep-inst']+"<strong>",
                ridLookup[cart.key.rid.toString()]['cook-inst'],
                "<i>"+ridLookup[cart.key.rid.toString()]['serv-inst']+"</i>"
            ];
            
            
            for (var i = 0; i < cart.key.count; i++) {
                var ingredientList = ridLookup[cart.key.rid.toString()].ingredients;
                for (var j = 0; j < ingredientList.length; j++) {
                    var iName = ingredientList[j].iName;
                    var unit = ingredientList[j].unit;
                    var measure = ingredientList[j].measure;
                    if (!ingredientsToBuy.hasOwnProperty(iName)) {
                        ingredientsToBuy[iName] = {};
                    }
                    if (!ingredientsToBuy[iName].hasOwnProperty(unit)) {
                        ingredientsToBuy[iName][unit] = 0;
                    }
                    
                    ingredientsToBuy[iName][unit] += measure;
                }
            }
        });
        order_list += "</ul>"
        
        var instruction_list = "";
        Object.keys(instructions).forEach(function(key) {
            instruction_list += "<h3>" + key + "</h3>";
            for (var i = 0; i < instructions.key.length; i++) {
                instruction_list += "<p>" + instructions.key[i] + "</p>";
            }
        });
        

        ingredientsToBuy = Object.keys(ingredientsToBuy).sort().reduce((r, k) => (r[k] = ingredientsToBuy[k], r), {});

        
        var shopping_list = "<ul>";
        
        Object.keys(ingredientsToBuy).forEach(function(key) {
            shopping_list += "<li>" + key + " ";
            var temp_ingredients = [];
            Object.keys(ingredientsToBuy.key).forEach(function(k){
                temp_ingredients.push(ingredientsToBuy.key.k + " " + k);
            });
            shopping_list += temp_ingredients.join(" + ");
            shopping_list += "</li>"
        });
        
        shopping_list += "</ul>";
        
        return (
            <div id="final-list">
                <h1>Order</h1>
                {order_list}
                <h1>Instruction List</h1>
                {instruction_list}
                <h1>Shopping List</h1>
                {shopping_list}
            </div>
        );
    }
}