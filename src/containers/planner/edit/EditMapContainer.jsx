import { useDispatch, useSelector } from 'react-redux';
import EditMap from '../../../components/planner/edit/EditMap';
import { changeMapDataAction, plannerInitializePropertyAction } from '../../../modules/plannerModule';
import { changeSpotDataAction, spotInitializeFormAction } from '../../../modules/spotModule';
import { useHistory } from 'react-router';

const EditMapContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { planner, plannerError, spotError, plannerData, spots, account, mapData } = useSelector(
        ({ plannerReducer, spotReducer, authReducer }) => ({
            planner: plannerReducer.planner,
            plannerError: plannerReducer.plannerError,
            spotError: spotReducer.spotError,
            spots: spotReducer.spots,
            contentTypeList: spotReducer.contentTypeList,
            plannerData: plannerReducer.plannerData,
            mapData: plannerReducer.mapData,
            account: authReducer.account,
        }),
    );

    const { plannerId } = { ...plannerData };
    const { allSchedule, tutorial } = { ...mapData };

    // spotError 리셋
    const onCloseSpotError = () => {
        dispatch(spotInitializeFormAction('spotError'));
    };

    // plannerError 리셋
    const onClosePlannerError = () => {
        dispatch(plannerInitializePropertyAction('plannerError'));
    };

    const handleToggleScheduleView = (bool) => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: bool }));
    };

    const onChangeAreaIndex = (index) => {
        dispatch(changeSpotDataAction({ property: 'areaCode', value: index }));
    };

    // mobbile Route Nav 토글
    const onToggleMobileNavRoute = (bool) => {
        dispatch(changeMapDataAction({ property: 'navRoute', value: bool }));
        dispatch(changeMapDataAction({ property: 'navList', value: false }));
    };

    // mobile navList toggle
    const onToggleMobileNavList = (bool) => {
        dispatch(changeMapDataAction({ property: 'navList', value: bool }));
        dispatch(changeMapDataAction({ property: 'navRoute', value: false }));
    };

    const onClickAllSchedule = () => {
        dispatch(changeMapDataAction({ property: 'allSchedule', value: !allSchedule }));
    };

    // 튜토리얼모달 토글
    const onClickTutorialModal = () => {
        dispatch(changeMapDataAction({ property: 'tutorial', value: !tutorial }));
    };

    // 일정 저장 버튼
    const onSavePlanner = () => {
        history.push(`/Planners/${plannerId}`);
    };

    // isView 토글
    const onClickToggleIsView = () => {
        dispatch(changeMapDataAction({ property: 'isView', value: true }));
    };

    return (
        <EditMap
            planner={planner}
            spots={spots}
            plannerData={plannerData}
            mapData={mapData}
            plannerError={plannerError}
            spotError={spotError}
            onClosePlannerError={onClosePlannerError}
            onCloseSpotError={onCloseSpotError}
            handleToggleScheduleView={handleToggleScheduleView}
            onChangeAreaIndex={onChangeAreaIndex}
            onToggleMobileNavRoute={onToggleMobileNavRoute}
            onToggleMobileNavList={onToggleMobileNavList}
            onClickAllSchedule={onClickAllSchedule}
            onClickTutorialModal={onClickTutorialModal}
            onSavePlanner={onSavePlanner}
            onClickToggleIsView={onClickToggleIsView}
        />
    );
};

export default EditMapContainer;
