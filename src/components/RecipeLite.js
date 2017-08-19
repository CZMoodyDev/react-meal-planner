//src/components/RecipeLite.js
import React from 'react';

export default class RecipeLite extends React.Component {
    
    constructor() {
        super();
        this.state = {
            requested: 0
        }
    }
    
    increment() {
        this.setState({requested: this.state.requested + 1});
        this.props.addToCart(this.props.name, this.props.rid);
    }
    
    decrement() {    
        if (this.state.requested != 0) {
            this.setState({requested: this.state.requested - 1});
            this.props.dropFromCart(this.props.name);
        }
    }
    
    render() {
        var recID = "rec" + this.props.rid;
        var recIDHREF = "#" + recID;
                
        return (
            <div className="single-leaf">
                <h4>{this.props.name}</h4>
                <div className="input-group col-md-4">
                    <span className="input-group-btn">
                        <button type="button" className="quantity-left-minus btn btn-danger btn-number"  data-type="minus" data-field="" onClick={this.decrement.bind(this)}>
                          <span className="glyphicon glyphicon-minus"></span>
                        </button>
                    </span>
                    <input type="text" id="quantity" name="quantity" className="form-control input-number" value={this.state.requested} min="1" max="100"></input>
                    <span className="input-group-btn">
                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field="" onClick={this.increment.bind(this)}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}