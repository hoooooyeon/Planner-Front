import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';
import ListPagination from './ListPagination';

const PlannerList = ({ sharePlanners, onLoadPlanner }) => {
    return (
        <>
            <MyPlannerList />
            <ShareList sharePlanners={sharePlanners} onLoadPlanner={onLoadPlanner} />
            <ListPagination />
        </>
    );
};

export default PlannerList;
