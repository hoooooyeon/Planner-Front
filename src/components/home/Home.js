import styled from 'styled-components';
import Intro from './Intro';

const HomeBlock = styled.div`
    margin: 100px auto;
    width: 80%;
`;

const Home = () => {
    return (
        <HomeBlock>
            <Intro />
        </HomeBlock>
    );
};

export default Home;
