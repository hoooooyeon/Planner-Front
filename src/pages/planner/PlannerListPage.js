import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PlannerListContainer from '../../containers/planner/list/PlannerListContainer';
import PaginationContainer from '../../containers/planner/PaginationContainer';

const PlannerListPage = () => {
    return (
        <>
            <Header />
            <PlannerListContainer />
            <PaginationContainer />
            <Footer />
        </>
    );
};
export default PlannerListPage;
