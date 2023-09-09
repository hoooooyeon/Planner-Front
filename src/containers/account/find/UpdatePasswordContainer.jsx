import { useHistory } from 'react-router';
import UpdatePassword from '../../../components/account/find/UpdatePassword';

const UpdatePasswordContainer = () => {
    // http://localhost:3000/UpdatePassword?key=190ac5d29f40958a11c88d0249e93e2bdc009e41784bd31c9428d6d5bb2e03cd
    const history = useHistory();

    return <UpdatePassword />;
};

export default UpdatePasswordContainer;
