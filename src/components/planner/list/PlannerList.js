import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';
import ListPagination from './ListPagination';

const PlannerList = ({ sharePlanners, onLoadPlanner, plannerError }) => {
    return (
        <>
            <MyPlannerList />
            <ShareList sharePlanners={sharePlanners} onLoadPlanner={onLoadPlanner} plannerError={plannerError} />
            <ListPagination />
        </>
    );
};

export default PlannerList;
