
const path =  require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

//process.env.NODE_ENV //env variable, set by heroku to 'production', we set it to test for scripts, and its set to undefined (development) by default
//yarn add --dev cross-env
//I created .env.test and .env.development at root of project, works with dotenv
//I also created a new firebase project, made database public (rules to true)
//yarn add --dev dotenv to get data from these files into env variables
//added to this file the new webpack.definePlugin, because node env variables are not passed to client side  javascript for security reasons
//now I take all the KEY=value pairs in .env.development add add them one by one in termal heroku config:set, see them all with heroku config command
process.env.NODE_ENV = process.env.NODE_ENV || 'development';  //first one if not falsy

if (process.env.NODE_ENV === 'test') {  //for test, I have to make a change in setupTests.js
    require('dotenv').config({ path: '.env.test' });
} else if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
    console.log('***env', env);  //undefined, unless yarn run build:prod, then it gets set to "production"

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/app.js'],   //yarn add babel-polyfill (helps browsers support es6/es7 methods)
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({   //use lets you add in multiple loaders
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            },

                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            },

                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,   //after adding this, I had to add a link tag in head of index.html
            new webpack.DefinePlugin ({  //node env variables arent passed to client side, so we hav to do this
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER)
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',    //shows where error occured, where console.logs occur
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,   //tells dev server to serve up index.html for all 404s
            publicPath: '/dist/'
        }
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


