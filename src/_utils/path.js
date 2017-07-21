export const pathPartOk = (part, isLast) => {
    let ok = (part.replace(/[a-z]/g, '').length === 0);

    if (!ok && isLast && (
        part.replace(/@/g, '')
            .replace(/[0-9]/g, '')
            .replace(/[a-z]/g, '').length === 0)) {
        const versionParts = part.split('@');
        ok = parseInt(versionParts[1]) == versionParts[1];
    }

    return ok;
}

export const validatePath = (path) => {
    let parts, ok = true, reason = '';

    if (!path) {
        return {ok: false, reason: 'path does not exist'}
    }

    parts = path.split('.');

    if (parts.length !== 3) {
        return {ok: false, reason: `path "${path}" contains ${parts.length} parts. must have 3 parts`}
    }

    parts.forEach((part, index) => {
        if (!pathPartOk(part, index == parts.length - 1)) {
            reason = `path part "${part}" must only contain lowercase a-z`;
            ok = false;
        }
    })

    if (!ok) {
        return {ok: false, reason: reason}
    }

    return {ok: true};
}

export const cleanPath = (path) => {
   return path.split('@')[0];
}

export const pathVersion = (path) => {
    return path.split('@')[1];
}