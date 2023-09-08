import { useEffect } from 'react';
import { useHistory } from 'react-router';
import ResultFindId from '../../../components/account/find/ResultFindId';

const ResultFindIdContainer = () => {
    const history = useHistory();

    // useEffect(() => {
    //     if(!verificationCode || verificationCode.length < 0){
    //         alert('잘못된 접근입니다.');
    //         history.push('/login')
    //     }
    // })

    // verificationCode이 없으면 return null;
    return <ResultFindId />;
};

export default ResultFindIdContainer;
