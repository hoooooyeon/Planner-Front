import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
// import { persistor } from '../../index';
import { useHistory } from 'react-router';

const HeaderContainer = () => {
    const history = useHistory();
    const { account } = useSelector(({ authReducer }) => ({
        account: authReducer.account,
    }));

    const handlePurge = () => {
        // persistor.purge();
    };

    const onChangePage = (page) => {
        history.push(`/${page}`);
    };

    return <Header account={account} handlePurge={handlePurge} onChangePage={onChangePage} />;
};

export default HeaderContainer;
