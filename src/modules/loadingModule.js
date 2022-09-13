
const loadingStartType = 'loading/START_LOADING';
const loadingFinishType = 'loading/FINISH_LOADING';

export const loadingStartAction = () => ({
    type: loadingStartType
});

export const loadingFinishAction = () => ({
    type: loadingFinishType
});

const initialState = {};

function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case loadingStartType: {
            return { ...state, loading: true };
        }
        case loadingFinishType: {
            return { ...state, loading: false };
        }
        default: {
            return state;
        }
    }
}

export default loadingReducer;