import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';

const PlannerList = ({ myPlanners, sharePlanners, plannerError, onCreatePlanner, onLoadPlanner, onResetPlannerInfoForm, onChangeCurPlannerId }) => {
    return (
        <>
            <MyPlannerList myPlanners={myPlanners} onCreatePlanner={onCreatePlanner} onResetPlannerInfoForm={onResetPlannerInfoForm} onChangeCurPlannerId={onChangeCurPlannerId} />
            <ShareList sharePlanners={sharePlanners} onLoadPlanner={onLoadPlanner} plannerError={plannerError} onChangeCurPlannerId={onChangeCurPlannerId} />
        </>
    );
};

export default PlannerList;
