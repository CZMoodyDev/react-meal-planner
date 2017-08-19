//src/components/Ingredient.js
import React from 'react';

export default class Ingredient extends React.Component {
    render() {
        var line = this.props.measure + this.props.unit + " " + this.props.iName;
        return (
            <li>{line}</li>
        );
    }
}