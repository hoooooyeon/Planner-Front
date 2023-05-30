export class QueryStringUtil {
    constructor() {
    }

    static seperate(url) {
        if (url == null) {
            throw new Error('URL is Empty.');
        }

        if (typeof (url) !== 'string') {
            throw new Error('URL is Not String.');
        }

        const list = url.split(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/g);
        if (!list || list.length == 0 || !list[7]) {
            return {};
        }
        const querySeperate = list[7].split('&');
        const eqSeperate = querySeperate.map(item => item.split('='));
        const seperateObject = Object.fromEntries(eqSeperate);

        return seperateObject;
    }
}