import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import palette from '../../lib/styles/palette';

const SpotItemBlock = styled.li`
    flex-shrink: 0;
    width: 200px;
    float: left;
    border-radius: 2px;
    margin: 0.1%;
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
    padding: 0;
    margin: 0;
    overflow: hidden;
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    border: none;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
    /* height: 150px; */
    @media all and (min-width: 768px) {
        /* height: 150px; */
    }
    @media all and (min-width: 1024px) {
        /* height: 250px; */
    }
`;

const Name = styled.div`
    height: 2rem;
    line-height: 2rem;
    padding: 0.1rem 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: white;
    border: 0.1rem solid lightgray;
    border-top: 0;
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
