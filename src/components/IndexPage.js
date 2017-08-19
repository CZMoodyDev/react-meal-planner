//src/components/IndexPage.js
import React from 'react';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
    render() {
        return (
            <div id="menu" className="container">
                <div className="col-md-12 text-center">
                    <ul className="list-inline list-unstyled">
                        <Link to={'/create-list'}>
                            <li className="btn btn-primary">Create List</li>
                        </Link>
                        <Link to={'/cookbook'}>
                            <li className="btn btn-primary">Edit Cookbook</li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}