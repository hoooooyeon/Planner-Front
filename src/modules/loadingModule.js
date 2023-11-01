
const loadingStartType = 'loading/START_LOADING';
const loadingFinishType = 'loading/FINISH_LOADING';

export const loadingStartAction = (loadingType) => ({
    type: loadingStartType,
    loadingType
});

export const loadingFinishAction = (loadingType) => ({
    type: loadingFinishType,
    loadingType
});

const initialState = {
    loading: false
};

function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case loadingStartType: {
            return { ...state, loading: true, [action.loadingType]: true };
        }
        case loadingFinishType: {
            return { ...state, loading: false, [action.loadingType]: false };
        }
        default: {
            return state;
        }
    }
}

export default loadingReducer;