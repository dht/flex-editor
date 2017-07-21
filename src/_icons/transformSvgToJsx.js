var fs = require('fs');

function upperCase(str) {
	return str.substr(0,1).toUpperCase() + str.substr(1);
}

function svgToJsx(className, data) {
	var regexSvg = /<svg[^<]+[.\s\S]+/g,
		regexXml = /xml[ns]*?:?[a-z]*=".+?"/g;

	var matches = data.match(regexSvg);
	data = matches[0];

	matches = data.match(regexXml);

	matches.forEach(match => {
		data = data.replace(match, '');
	})

	data = data
		.replace(/stroke-linejoin/g, 'strokeLinejoin')
		.replace(/stroke-linecap/g, 'strokeLinecap')
		.replace(/stroke-miterlimit/g, 'strokeMiterlimit')
		.replace(/stroke-width/g, 'strokeWidth')
		.replace(/enable-background/g, 'enableBackground')

	return 'import React from "react";\n\nexport const '  + className + ' = (props) => ' + data + '\n\n export default ' + className;
}

function tranformSvgToJsx(className, filename) {
	fs.readFile('./svg/' + filename, 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		const newFilename = className + '.js';

		fs.writeFile("./" + newFilename, svgToJsx(className, data), function(err) {
			if(err) {
				return console.log(err);
			}

			console.log(newFilename + " was saved!");
		});

	});
}

var output = '', output_export = [];

fs.readdir('./svg', (err, files) => {
	files.forEach(file => {
		const className = upperCase(file
			.replace('.svg', '')
			.replace(/-/g, '_'));

		tranformSvgToJsx(className, file);
		output += 'import ' + className + ' from \'./' + className + '\'\n';

		output_export.push(className);
	});

	output += '\n\n export {' + output_export.join(', ') + '}'

	fs.writeFile("./index.js", output , function(err) {
		if(err) {
			return console.log(err);
		}

		console.log('index.js' + " was saved!");
	});
})