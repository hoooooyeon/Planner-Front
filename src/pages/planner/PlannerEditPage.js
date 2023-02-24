import EditRouteContainer from '../../containers/planner/edit/EditRouteContainer';
import EditMapContainer from '../../containers/planner/edit/EditMapContainer';
import EditListContainer from '../../containers/planner/edit/EditListContainer';

const PlannerEditPage = () => {
    return (
        <>
            <EditRouteContainer />
            <EditMapContainer />
            <EditListContainer />
        </>
    );
};
export default PlannerEditPage;
