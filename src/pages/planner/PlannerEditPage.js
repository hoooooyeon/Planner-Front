import EditRouteContainer from '../../containers/planner/edit/EditRouteContainer';
import EditMapContainer from '../../containers/planner/edit/EditMapContainer';
import EditListContainer from '../../containers/planner/edit/EditListContainer';
import MemberModalContainer from '../../containers/planner/MemberModalContainer';
import PlannerInfoModalContainer from '../../containers/planner/PlannerInfoModalContainer';
import EditListDetailModal from '../../components/planner/edit/EditListDetailModal';

const PlannerEditPage = () => {
    return (
        <>
            <EditRouteContainer />
            <EditMapContainer />
            <EditListContainer />
            <MemberModalContainer />
            <PlannerInfoModalContainer />
        </>
    );
};
export default PlannerEditPage;
