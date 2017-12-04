
const path =  require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    console.log('***env', env);  //undefined, unless yard run build:prod, then it gets set to "production"

    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
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
            CSSExtract   //after adding this, I had to add a link tag in head of index.html
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


