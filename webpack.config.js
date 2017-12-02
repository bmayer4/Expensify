
const path =  require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [                               //use lets you specify an array of loaders
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    devtool: 'cheap-module-eval-source-map',    //shows where error occured, where console.logs occur
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true   //tells dev server to serve up index.html for all 404s
    }
};

//ran from terminal
//yarn add react react-dom
//yarn add webpack
//yarn add webpack-dev-server

//from terminal-    yarn add babel-core babel-loader
//I created .babelrc
//we are doing this to show webpack how to run babel, run files that end with .js that are not in module folder

//for scss
//yarn add style-loader css-loader
//yarn add sass-loader node-sass
//created styles.scss file in styles folder, added the new rule with test and use 


