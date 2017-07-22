export const bigScreen = window.innerHeight > 750;

// https://stackoverflow.com/a/3809435/172815
export const isUrl = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    return regex.test(url);
}