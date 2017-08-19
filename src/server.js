// src/server.js
import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
var mysql = require('mysql');

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));


app.get('/recipes', function(req, res) {   
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: ""
    });
    
    con.connect(function(err) {
        if (err) throw err;
        
        var selectRecipes = "SELECT * FROM mealplanner.recipe";     

        con.query(selectRecipes, function(err, result) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        });    
    });
   
});

app.post('/edit', function(req, res) {   
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: ""
    });
    
    var name = decodeURI(req.query.name);
    var prep_inst = decodeURI(req.query['prep-inst']);
    var cook_inst = decodeURI(req.query['cook-inst']);
    var serv_inst = decodeURI(req.query['serv-inst']);
    var ingredients = decodeURI(req.query['ingredients']);
    var rid = req.query['rid'];
    
    con.connect(function(err) {
        if (err) throw err;
        var editSQL = "UPDATE mealplanner.recipe SET `name`='"+name+"', `prep-inst`='"+prep_inst+"', `cook-inst`='"+cook_inst+"', `serve-inst`='"+serv_inst+"', `ingredients`='"+ingredients+"' ";
        editSQL += "WHERE `rid`='"+rid+"'";

        con.query(editSQL, function(err, result) {
            if (err) throw err;
            res.send("Success");
        });    
    });
   
});

app.post('/add-recipe', function(req, res) {   
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: ""
    });
    
    var name = decodeURI(req.query.name);
    var prep_inst = decodeURI(req.query['prep-inst']);
    var cook_inst = decodeURI(req.query['cook-inst']);
    var serv_inst = decodeURI(req.query['serv-inst']);
    var ingredients = decodeURI(req.query['ingredients']);
        
    con.connect(function(err) {
        if (err) throw err;
        var addSQL = "INSERT INTO mealplanner.recipe (`name`, `prep-inst`, `cook-inst`, `serve-inst`, `ingredients`) ";     
        addSQL += "VALUES ('"+name+"', '"+prep_inst+"', '"+cook_inst+"', '"+serv_inst+"', '" + ingredients + "')";
                
        con.query(addSQL, function(err, result) {
            if (err) throw err;
            res.send("Success");
        });    
    });
   
});

app.post('/delete', function(req, res) {   
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: ""
    });
    
    var id = decodeURI(req.query.id);
    
    con.connect(function(err) {
        if (err) throw err;
        
        var deleteRecipes = "DELETE FROM mealplanner.recipe WHERE rid="+id;     

        con.query(deleteRecipes, function(err, result) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        });    
    });
   
});

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  
  console.info(`Server running on http://localhost:${port} [${env}]`);
});