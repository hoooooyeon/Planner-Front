import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LikeSpots from './LikeSpots';
import LikePlanners from './LikePlanners';
import LikeReviews from './LIkeReviews';

const MyLikeBlock = styled.div`
  margin: 100px auto;
  width: 80%;
`;
const MyMenu = styled.div`
  a {
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    color: lightgray;
  }
  a + a {
    margin-left: 30px;
    color: black;
  }
`;

const MyLike = () => {
  return (
    <MyLikeBlock>
      <MyMenu>
        <Link to="/Profile">프로필</Link>
        <Link to="/MyLike">좋아요</Link>
        <hr />
      </MyMenu>
      <LikeSpots />
      <LikePlanners />
      <LikeReviews />
    </MyLikeBlock>
  );
};

export default MyLike;
