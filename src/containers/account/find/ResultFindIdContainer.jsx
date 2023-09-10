import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ResultFindId from '../../../components/account/find/ResultFindId';
import { initializeAction, initializeErrorAction } from '../../../modules/accountModule';

const ResultFindIdContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { accountError } = useSelector(({ accountReducer }) => ({
        accountError: accountReducer.accountError,
    }));

    // useEffect(() => {
    //     if(!verificationCode || verificationCode.length < 0){
    //         alert('잘못된 접근입니다.');
    //         history.push('/login')
    //     }
    // })

    useEffect(() => {
        return () => {
            dispatch(initializeAction());
            dispatch(initializeErrorAction());
        };
    }, [dispatch]);

    return <ResultFindId accountError={accountError} />;
};

export default ResultFindIdContainer;
