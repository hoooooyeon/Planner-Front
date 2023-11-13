import { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { resetPlannerErrorAction, toggleScheduleViewAction } from '../../../modules/plannerModule';
import circleImg from '../../../lib/images/circle.png';
import locationImg from '../../../lib/images/location.png';
import { changeAreaIndexAction, resetSpotErrorAction } from '../../../modules/spotModule';
import { useHistory } from 'react-router';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { planner, plannerError, spotError, plannerData, spots, account, allSchedule } = useSelector(
        ({ plannerReducer, spotReducer, authReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            spotError: spotReducer.spotError,
            spots: spotReducer.spots,
            keyword: spotReducer.keyword,
            contentTypeList: spotReducer.contentTypeList,
            plannerData: plannerReducer.plannerData,
            allSchedule: plannerReducer.allSchedule,
            account: authReducer.account,
        }),
    );

    const { plannerId } = { ...plannerData };
    const { plans } = { ...planner };
    const { accountId } = { ...account };

    // 일정 저장 버튼
    const onSavePlanner = () => {
        history.push(`/Planners/${plannerId}`);
    };

    // 튜토리얼모달 토글
    const [tutorialVisible, setTutorialVisible] = useState(false);
    const onClickTutorialModal = () => {
        setTutorialVisible(!tutorialVisible);
    };

    // spotError 리셋
    const onCloseSpotError = () => {
        dispatch(resetSpotErrorAction());
    };

    // plannerError 리셋
    const onClosePlannerError = () => {
        dispatch(resetPlannerErrorAction());
    };

    const handleToggleScheduleView = (bool) => {
        dispatch(toggleScheduleViewAction(bool));
    };

    const onChangeAreaIndex = (index) => {
        dispatch(changeAreaIndexAction(index));
    };

    if (
        // !mapRef ||
        Object.keys(planner).length <= 0 ||
        accountId !== planner.accountId
    ) {
        return null;
    }
    return (
        <EditMap
            // mapRef={mapRef}
            planner={planner}
            spots={spots}
            plannerData={plannerData}
            allSchedule={allSchedule}
            plannerError={plannerError}
            spotError={spotError}
            // onClickAllSchedule={onClickAllSchedule}
            onSavePlanner={onSavePlanner}
            tutorialVisible={tutorialVisible}
            onClickTutorialModal={onClickTutorialModal}
            onClosePlannerError={onClosePlannerError}
            onCloseSpotError={onCloseSpotError}
            handleToggleScheduleView={handleToggleScheduleView}
            onChangeAreaIndex={onChangeAreaIndex}
        />
    );
};

export default EditMapContainer;
