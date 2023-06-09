import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const SpotItemBlock = styled.li`
    width: 200px;
    float: left;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: none;
    margin: 0.5%;
    position: relative;
    @media all and (min-width: 768px) {
        width: 24%;
    }
    &:hover {
        cursor: pointer;
    }
`;

const ImgBox = styled.div`
    background-color: lightgray;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 75%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
`;

const Name = styled.div`
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    padding: 0.1rem 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: white;
    border-top: 0;
    border-radius: 0 0 0.5rem 0.5rem;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'lightgray')};
`;

const SpotItem = ({ spot, onChangeErrorImg, onOpenDetail }) => {
    const { title, firstimage, likeState } = spot;

    return (
        <SpotItemBlock
            onClick={() => {
                onOpenDetail(spot);
            }}
        >
            <ImgBox>
                <Img src={firstimage} alt={title} onError={onChangeErrorImg} />
                <IconBox>
                    <StyledFontAwesomeIcon icon={faStar} like={likeState ? likeState.toString() : undefined} />
                </IconBox>
            </ImgBox>
            <Name>{title}</Name>
        </SpotItemBlock>
    );
};

export default SpotItem;
