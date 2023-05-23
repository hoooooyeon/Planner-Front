import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Modal from '../../common/Modal';
import MemberModal from '../MemberModal';
const EditMapBlock = styled.div`
    /* width: 100%; */
    width: calc(100% - 720px);
    height: 750px;
    float: left;
    position: relative;
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 999;
    display: flex;
    flex-direction: column;
    /* button {
        margin-bottom: 10px;
    } */
`;

const Button = styled.button`
    border: none;
    border-radius: 1rem;
    width: 8rem;
    height: 3rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    cursor: pointer;

    margin-bottom: 10px;
    &:hover {
        transform: translate(1px, -1px);
    }
    a {
        display: block;
        color: white;
        height: 100%;
        line-height: 3rem;
    }
`;

const AreaBox = styled.div`
    background-color: white;
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
}
`;

const AreaSelect = styled.select`
    border-radius: 0.5rem;
    border: 0.2rem solid #cdd9ac;
    width: 80px;
    height: 40px;
    z-index: 1;
    &:invalid {
        color: lightgray;
    }
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchBox = styled.div`
    position: absolute;
    top: 15%;
    left: 50%;
    width: 30rem;
    background: #cdd9ac;
    padding: 10px;
    height: 4rem;
    transform: translate(-50%, -50%);
    z-index: 999;
`;

const SearchForm = styled.form`
    padding: 10px 15px;
    width: 28rem;
    height: 2rem;
    display: flex;
    background-color: #cdd9ac;
    align-items: center;
    justify-content: space-around;

    /* input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    } */
`;

const SearchInput = styled.input`
    width: 20rem;
    height: 2rem;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 0.5rem;
    width: 5rem;
    height: 2rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        transform: translate(1px, -1px);
    }
`;

const CloseButton = styled.button`
    border: none;
    border-radius: 0.5rem;
    width: 3rem;
    height: 1rem;
    background-color: rgba(255, 203, 193, 80%);
    color: white;
    font-weight: bold;
    float: right;
    cursor: pointer;
`;

const InvisibleInput = styled.input`
    display: none;
`;

const EditMap = ({ mapRef, keyword, onToggleMemberModal, onTogglePlannerInfoModal, getLocationByAddress, areas, spotData, onUpdateAreaNum, onChangeKeyword, onSearchSpot, onResetKeyword, onResetSpotData }) => {
    const [isSearch, setIsSearch] = useState(false);

    const onSearch = () => {
        if (isSearch) {
            setIsSearch(false);
            onResetKeyword();
        } else {
            setIsSearch(true);
        }
    };

    if (!mapRef) {
        return <div>Loading...</div>;
    }
    return (
        <EditMapBlock>
            <Map ref={mapRef} />
            <ButtonBox>
                <Button>사용 방법</Button>
                <Button onClick={onToggleMemberModal}>멤버 초대</Button>
                <Button onClick={onTogglePlannerInfoModal}>플래너 정보 수정</Button>
                <Button onClick={onSearch}>장소 검색</Button>
                <Button onClick={onResetSpotData}>
                    <Link to="/PlannerInfo">일정 저장</Link>
                </Button>
            </ButtonBox>
            <AreaBox>
                <AreaSelect
                    required
                    value={spotData.areaNum}
                    onChange={(e) => {
                        onUpdateAreaNum(e.target.value);
                    }}
                >
                    {areas &&
                        areas.map((area) => (
                            <option value={area.code} key={area.code}>
                                {area.name}
                            </option>
                        ))}
                </AreaSelect>
            </AreaBox>
            {isSearch && (
                <Background>
                    <SearchBox>
                        <CloseButton onClick={onSearch}>닫기</CloseButton>
                        <>
                            <SearchForm>
                                <SearchInput
                                    placeholder="장소 검색"
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => {
                                        onChangeKeyword(e.target.value);
                                    }}
                                />
                                <InvisibleInput type="text" />
                                <SearchButton type="button" onClick={onSearchSpot}>
                                    검색
                                </SearchButton>
                            </SearchForm>
                        </>
                    </SearchBox>
                </Background>
            )}
        </EditMapBlock>
    );
};

export default EditMap;
