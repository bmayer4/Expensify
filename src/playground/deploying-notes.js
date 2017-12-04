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


//Set up express, live-server and webpack-dev-server are not suitable for production
//yarn add express
//created server/server.js file and code inside, set up server on port 3000
//in terminal, node server/server.js


//heroku
//install heroku cli, installer. command line heroku --v to see that it is installed
//heroku login
//heroku create OptionalCustomAppName   , I did heroku create
//above adds a git remote to your local repository
//we then push our code up to the heroku remote  (you can command line 'git remote' to see)
//***before this, I am making changes to app
//heroku tries to run start script in package.json, "start": "node server/server.js"
//now I use heroku env variable that was given to us in server/server.js (process.env.PORT)
//now we have to teach heroku how to run webpack
//we don't want to push up bundle.js, bundle.js.map, styles.css, styles.css.map to heroku, they are generated when we run webpack
//heroku will look for. "heroku-postbuild": "yarn run build:prod"    now the webpack production build will run on the heroku servers
//I need to gitignore the 4 files. Now we can push our code to heroku. (first push to github)
//in terminal, git push heroku master
