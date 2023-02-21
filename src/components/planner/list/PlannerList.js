import MyPlannerList from './MyPlannerList';
import ShareList from './ShareList';
import ListPagination from './ListPagination';

const PlannerList = ({ planners }) => {
    return (
        <>
            <MyPlannerList />
            <ShareList planners={planners} />
            <ListPagination />
        </>
    );
};

export default PlannerList;
