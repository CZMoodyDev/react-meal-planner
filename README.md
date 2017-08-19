# react-meal-planner
In-house meal planning tool with a node.js backend and react front-end. This version retires my similar meal-planner php project.

# Notes
node_modules is versioned because a stackoverflow post convinced me it should be. 

This project requires a mySQL database with a table mealplanner.recipe with the following columns:
1. rid - PK AI Row/Recipe id
2. prep-inst - Preperation instructions
3. cook-inst - Cooking instructions
4. serve-inst - Serving instructions
5. ingredients - JSON formatted array of ingredient objects

Here's a dummy ingredient:
```javascript
[
    {
        iName: 'chicken breast',
        unit: 'x',
        amount: 3
    },    
    {
        iName: 'Honey',
        unit: 'TBSP',
        amount: 1.5
    }
    

]
```

# Running the app
Once the server.js is running, you can go to localhost:3000 to use the app.

The assumption is you already have node installed on your computer.

You might have to build the webpack before running the server. I'm newer to react/node, so here's how I do it with GIT Bash:
1. Navigate to the folder containing the react-meal-planner project
2. Right click on the folder, open in GIT Bash
3. `$ NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js`
4. `$ NODE_EVN=production node_modules/.bin/webpack -p`