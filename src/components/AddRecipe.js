// src/components/AddRecipe.js
import React from 'react';
import { Link } from 'react-router';

export default class AddRecipe extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            prep: "",
            cook: "",
            serv: "",
            ingredients: {
            },
            ingredientCount: 1,
            ingredientIDInc: 1,
            successAlert: false,
            failAlert: false
        };
    }
    
    addIngredient() {
        this.setState({ingredientCount: this.state.ingredientCount + 1});
        this.setState({ingredientIDInc: this.state.ingredientIDInc + 1});
        
        var newIngredients = this.state.ingredients;
        newIngredients[this.state.ingredientIDInc.toString()] = {
            'iName': "",
            'unit': "",
            'measure': ""
        };
        
        this.setState({ingredients: newIngredients});
        
    }
    
    removeIngredient(id) {
        if (this.state.ingredientCount > 1) {
            this.setState({ingredientCount: this.state.ingredientCount - 1});
            
            var newIngredients = this.state.ingredients;
            delete newIngredients[id.toString()];
            this.setState({ingredients: newIngredients});
        }
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        if (name == "name" || name == "prep" || name == "cook" || name == "serv") {
            this.setState({
                [name]: value
            });
        } else {
            var idStart = 4;
            if (name[0] == "i") {
                idStart = 5;
            } else if (name[0] == 'm') {
                idStart = 7;
            }
            
            var id = name.substring(idStart);
            var input_type = name.substring(0, idStart);
            
            var newIngredients = this.state.ingredients;
            newIngredients[id.toString()][input_type] = value.toString();
            
            this.setState({ingredients: newIngredients});
        }
    }
  
    onSubmit() {
        var name = encodeURI(this.state.name);
        var prep = encodeURI(this.state.prep);
        var cook = encodeURI(this.state.cook);
        var serv = encodeURI(this.state.serv);
        var ingredients = [];
        
        var keys = Object.keys(this.state.ingredients);
        
        for (var i = 0; i < keys.length; i++) {
            ingredients.push(this.state.ingredients[keys[i]]);
        };
        
        ingredients = encodeURI(JSON.stringify(ingredients));
        
        if (name == null || prep == null || cook == null || serv == null || ingredients == null || ingredients.length == 0) {
            this.state.failAlert = true;
        } else {
            this.state.failAlert = false;
        }
        
        if (!this.state.failAlert) {
            var url = "./add-recipe?";
            url += "name=" + name;
            url += "&prep-inst=" + prep;
            url += "&cook-inst=" + cook;
            url += "&serv-inst=" + serv;
            url += "&ingredients=" + ingredients;
                        
            $.ajax({
                type: "POST",
                url: url,
                success: this.alertSuccess.bind(this)
            });
        }   
    }
    
    alertSuccess() {
        this.setState({successAlert: true});
    }

    render() {
        var ingredientInputs = [];
        var keys = Object.keys(this.state.ingredients);
        var alertDiv = this.state.successAlert ? (<div>TOTALLY SUCCESS</div>) : (
            <div>
            </div>
        );
        
        for (var i = 0; i < keys.length; i++) {
            var siName = "iName" + keys[i];
            var sUnit = "unit" + keys[i];
            var sMeasure = "measure" + keys[i];
            
            ingredientInputs.push((
                <div className="ing">
                    <div className="form-group">                
                        <label for={siName}>Ingredient Name:</label>
                        <input name={siName} type="text" className="form-control" onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div className="form-group">                
                        <label for={sUnit}>Units:</label>
                        <input name={sUnit} type="text" className="form-control" onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div className="form-group">                
                        <label for={sMeasure} >Amount:</label>
                        <input name={sMeasure} type="text" className="form-control" onChange={this.handleInputChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <button type="button" className="rmv-ingred btn btn-danger" onClick={this.removeIngredient.bind(this, keys[i])}>Remove ingredient</button>
                    </div>
                </div>
            )); 
        }
       
        return (
          <div className="container">
            {alertDiv}
            <div id="recipe-builder col-md-4 col-md-offset-2">
                <form id="builder-form" action="" method="post">
                    <div className="form-group">
                        <label for="name">Recipe Name</label>
                        <input name="name" type="text" className="form-control" onChange={this.handleInputChange.bind(this)} />
                    </div>
                    {ingredientInputs}
                </form>
                <button className="btn btn-primary" type="button" onClick={this.addIngredient.bind(this)}>Add ingredient</button>
                <label for="prep">Prepreparation Instructions:</label>
                <textarea name="prep" rows="4" cols="50" form="builder-form" onChange={this.handleInputChange.bind(this)} className="form-control"></textarea>
                <label for="cook">Cooking Instructions:</label>
                <textarea name="cook" rows="4" cols="50" form="builder-form" className="form-control" onChange={this.handleInputChange.bind(this)}></textarea>
                <label for="serv">Serving Instructions:</label>
                <textarea name="serv" rows="4" cols="50" form="builder-form" onChange={this.handleInputChange.bind(this)} className="form-control"></textarea>
                <input onClick={this.onSubmit.bind(this)} value="Add recipe" form="builder-form" className="form-control btn btn-primary" />
            </div>
            <div className="navigateBack">
              <Link to="/cookbook">« Back to Cookbook</Link>
            </div>
          </div>
        );
    }
}