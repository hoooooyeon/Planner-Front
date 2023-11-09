export const isEmpty = (object) => {
    if (object == null || object.constructor === Object && Object.keys(object).length === 0) {
        return true;
    }
    else {
        return false;
    }
};