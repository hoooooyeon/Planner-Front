import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PlannerInfoContainer from '../../containers/planner/info/PlannerInfoContainer';
import InfoPostContainer from '../../containers/planner/info/InfoPostContainer';

const PlannerInfoPage = () => {
    return (
        <>
            <Header />
            <PlannerInfoContainer />
            <InfoPostContainer />
            <Footer />
        </>
    );
};

export default PlannerInfoPage;
