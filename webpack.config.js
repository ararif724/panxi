const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "public/asset"),
	},
	module: {
        rules: [
            {
                test: /\.js$/i,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',['@babel/preset-react', {runtime: 'automatic'}]]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
};
