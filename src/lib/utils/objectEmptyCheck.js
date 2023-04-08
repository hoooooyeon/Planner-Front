export const isEmpty = (object) => {
    if (object.constructor === Object && object.keys().length() === 0) {
        return true;
    }
    else {
        return false;
    }
};