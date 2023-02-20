import EditMap from '../../components/planner/edit/EditMap';
import EditRoute from '../../components/planner/edit/EditRoute';
import EditList from '../../components/planner/edit/EditList';

const PlannerEditPage = () => {
    return (
        <>
            <EditRoute />
            <EditMap />
            <EditList />
        </>
    );
};
export default PlannerEditPage;
