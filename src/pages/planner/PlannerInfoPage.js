import Header from '../../components/common/Header';
import InfoRoute from '../../components/planner/info/InfoRoute';
import InfoMenu from '../../components/planner/info/InfoMenu';
import InfoPostList from '../../components/planner/info/InfoPostList';
import Footer from '../../components/common/Footer';

const PlannerInfoPage = () => {
    return (
        <>
            <Header />
            <InfoRoute />
            <InfoMenu />
            <InfoPostList />
            <Footer />
        </>
    );
};

export default PlannerInfoPage;
