import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Slider from '../../common/Slider';

const InfoDatinationBlock = styled.div`
    border-radius: 0.5rem;
`;

const DateList = styled.ul`
    display: flex;
    padding: 0.5rem 0.2rem;
    margin: 0;
    width: 100%;
`;

const DateButton = styled.li`
    border-radius: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.7rem;
    font-weight: bold;
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0.5rem;
    text-align: center;
    background-color: white;
    display: flex;
    cursor: pointer;
    white-space: nowrap;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
    &[aria-current] {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
`;

const InfoDatination = ({ isShadow, planner, plannerData, drag, onChangeCurPlanId }) => {
    const { plans } = { ...planner };

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + ' / ' + ('0' + date.getDate()).slice(-2);
    };

    const itemRef = useRef();

    if (!plans) {
        return <div>Loading...</div>;
    }
    return (
        <InfoDatinationBlock>
            <Slider list={plans} drag={drag} itemRef={itemRef}>
                <DateList>
                    {plans &&
                        plans.map((p, i) => (
                            <DateButton
                                ref={itemRef}
                                key={p.planId}
                                aria-current={p.planId === plannerData.planId ? 'date' : null}
                                onClick={() => {
                                    onChangeCurPlanId(p.planId);
                                }}
                            >
                                {letsFormat(p.planDate)}
                            </DateButton>
                        ))}
                </DateList>
            </Slider>
        </InfoDatinationBlock>
    );
};

export default InfoDatination;
