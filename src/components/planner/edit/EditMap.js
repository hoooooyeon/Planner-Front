import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const EditMapBlock = styled.div`
    width: calc(100% - 392px);
    /* width: 100%; */
    height: 100vh;
    float: left;
    position: relative;
    @media all and (min-width: 768px) {
        width: calc(100% - 742px);
    }
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
`;

const ButtonBox = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 150;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    border: none;
    border-radius: 2rem;
    width: 8rem;
    height: 3rem;
    color: gray;
    background-color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
    margin-bottom: 10px;
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.05);
    }
    a {
        display: block;
        color: gray;
        height: 100%;
        line-height: 3rem;
    }
`;

const EditMap = ({ mapRef, onResetSpotData }) => {
    if (!mapRef) {
        return <div>Loading...</div>;
    }
    return (
        <EditMapBlock>
            <Map ref={mapRef} />
            <ButtonBox>
                <Button>사용 방법</Button>
                <Button onClick={onResetSpotData}>
                    <Link to="/PlannerInfo">일정 저장</Link>
                </Button>
            </ButtonBox>
            {/* <AreaBox>
                <AreaSelect
                    required
                    value={spotData.areaIndex}
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
            </AreaBox> */}
            {/* {isSearch && (
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
                                <SearchButton
                                    type="button"
                                    onClick={() => {
                                        onSearchSpot();
                                        onSearch();
                                    }}
                                >
                                    검색
                                </SearchButton>
                            </SearchForm>
                        </>
                    </SearchBox>
                </Background>
            )} */}
        </EditMapBlock>
    );
};

export default EditMap;
