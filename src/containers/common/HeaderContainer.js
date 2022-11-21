import Header from "../../components/common/Header";
import { useSelector } from "react-redux";

const HeaderContainer = () => {
    const { account } = useSelector(({ authReducer }) => ({
        account: authReducer.account
    }));

    return (
        <Header account={account} />
    );
}

export default HeaderContainer;