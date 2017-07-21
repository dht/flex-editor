const hexToRgbA = (hex) => {
	let c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
	}
	throw new Error('Bad Hex');
}


export const parseRGBA = (value = '') => {

	// HEX?
	if (value.indexOf('#') >= 0) {
		value = hexToRgbA(value);
	}

	var regex = /rgba?\((\d+), ?(\d+), ?(\d+),? ?(([0-9]*[.])?[0-9]+)?\)/g;

	const matches = regex.exec(value);

	if (matches && matches.length) {
		let output = {};

		output.r = matches[1];
		output.g = matches[2];
		output.b = matches[3];
		output.a = matches[4] ? matches[4] : 1;

		return output;
	}
}

export const sameColor = (color1 = '', color2) => {

	// HEX?
	if (typeof color1 == 'string' && color1.indexOf('#') >= 0) {
		return color1 == color2;
	}

	return (
	color1 &&
	color2 &&
	color1.r == color2.r &&
	color1.g == color2.g &&
	color1.b == color2.b &&
	color1.a == color2.a);
}

export const borderColor = border => {
	let regex = /(\d+)px +solid +(#([A-Fa-f0-9]{3}){1,2})|(\d+)px +solid +(rgba?\(\d+, ?\d+, ?\d+,? ?(([0-9]*[.])?[0-9]+)?\))/g;

	const matches = regex.exec(border);

	if (matches && matches.length) {
		return matches[2]
	}
}

export const borderWidth = border => {
	let regex = /(\d+)px +solid +(#([A-Fa-f0-9]{3}){1,2})|(\d+)px +solid +(rgba?\(\d+, ?\d+, ?\d+,? ?(([0-9]*[.])?[0-9]+)?\))/g;

	const matches = regex.exec(border);

	if (matches && matches.length) {
		return matches[4]
	}
}