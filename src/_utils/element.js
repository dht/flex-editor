export const placeholderInnerText = (style) => {
    let output = '';

    if (style.flex) {
        output = `flex${style.flex}`;
    }else  if (style.width) {
        const width = parseInt(style.width, 10),
            height = parseInt(style.height, 10);

        if (height) {
            output =  `${width}x${height}px`;
        } else {
            output =  `${width}px`;
        }
    }

    return output;
}