//Production webpack
//in package.json, replaced   "build": "webpack" with  "build:dev": "webpack", "build:prod": "webpack -p --env production",


//Then in webpack.config.js, I changed module.exports, instead of exporting an objet, I exported a function that returns an object
//the advantahe of this is that the function can get called with some stuff, env
//then added    const isProduction = env === 'production';      in webpack.config.js to get a bool
//then added devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'   //cheap-... is good for development
//in production, we want to use 'source-map'
//the result is that now bundle.js is much smaller, but when user opens dev tools it then loads source-map


//NOW all css files are being loaded into bundle.js, we want webpack to put them into their own css file
//yard add extract-text-webpack-plugin, then use it in webpack.config.js
//had to add link tag to index.html to show styles.css which came from above plug in 
//made more changes to webpack.config..devtool