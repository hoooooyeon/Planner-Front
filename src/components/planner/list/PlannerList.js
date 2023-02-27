import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';
import ListPagination from './ListPagination';

const PlannerList = ({ sharePlanners, onLoadPlanner, plannerError, onResetPlannerInfoForm }) => {
    return (
        <>
            <MyPlannerList onResetPlannerInfoForm={onResetPlannerInfoForm} />
            <ShareList sharePlanners={sharePlanners} onLoadPlanner={onLoadPlanner} plannerError={plannerError} />
            <ListPagination />
        </>
    );
};

export default PlannerList;
