import styled from 'styled-components';
import Button from '../common/Button';

const EditProfileBlock = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    li {
      font-size: 1rem;
      margin-top: 20px;
    }
  }
  input {
    border: none;
    outline: none;
    &:focus {
      color: lightblue;
    }
  }
`;

const EditProfile = () => {
  return (
    <EditProfileBlock>
      <form>
        <ul>
          <li>
            <input name="email" value="bluebeer@naver.com" type="email" readOnly />
          </li>
          <li>
            <input name="password" value="" type="password" />
          </li>
          <li>
            <input name="username" value="" type="text" />
          </li>
          <li>
            <input name="nickname" value="" type="text" />
          </li>
        </ul>
      </form>
    </EditProfileBlock>
  );
};

export default EditProfile;
