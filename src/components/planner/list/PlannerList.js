import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';
import ListPagination from './ListPagination';

const PlannerList = ({ onCreatePlanner, sharePlanners, onLoadPlanner, plannerError, onResetPlannerInfoForm, onChangeCurPlannerId }) => {
    return (
        <>
            <MyPlannerList onCreatePlanner={onCreatePlanner} onResetPlannerInfoForm={onResetPlannerInfoForm} />
            <ShareList sharePlanners={sharePlanners} onLoadPlanner={onLoadPlanner} plannerError={plannerError} onChangeCurPlannerId={onChangeCurPlannerId} />
            <ListPagination />
        </>
    );
};

export default PlannerList;
