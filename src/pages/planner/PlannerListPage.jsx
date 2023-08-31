import Footer from '../../components/common/Footer';
import MyPlannerListContainer from '../../containers/planner/list/MyPlannerListContainer';
import ShareListContainer from '../../containers/planner/list/ShareListContainer';
import ShareListPaginationContainer from '../../containers/planner/list/ShareListPaginationContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ErrorModalContainer from '../../containers/common/ErrorModalContainer';

const PlannerListPage = () => {
    return (
        <>
            <HeaderContainer />
            <MyPlannerListContainer />
            <ShareListContainer />
            <ShareListPaginationContainer />
            <ErrorModalContainer />
            <Footer />
        </>
    );
};
export default PlannerListPage;
