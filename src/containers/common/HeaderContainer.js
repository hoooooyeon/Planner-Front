import Header from '../../components/common/Header';
import { useSelector } from 'react-redux';
import { persistor } from '../../index';

const HeaderContainer = () => {
    const { account } = useSelector(({ authReducer }) => ({
        account: authReducer.account,
    }));

    const handlePurge = () => {
        persistor.purge();
    };

    return <Header account={account} handlePurge={handlePurge} />;
};

export default HeaderContainer;
