class PromiseHolder {
    constructor() {
        this.holdPromise = null;
        this.resolve = null;
        this.reject = null;
    }

    init() {
        this.holdPromise = new Promise((resolve, reject) => {
            Object.assign(this, { resolve, reject });
        });
    }

    hold() {
        return this.holdPromise;
    }
}

export default PromiseHolder;