import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import ListPagination from '../../components/planner/list/ListPagination';
import ShareList from '../../components/planner/list/ShareList';
import PlannerListContainer from '../../containers/planner/PlannerListContainer';

const PlannerListPage = () => {
    return (
        <>
            <Header />
            <PlannerListContainer />
            <ShareList />
            <ListPagination />
            <Footer />
        </>
    );
};
export default PlannerListPage;
