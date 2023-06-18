import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Slider from '../../common/Slider';

const InfoDatinationBlock = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    ${(props) =>
        props.isShadow &&
        css`
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        `}
`;

const DateList = styled.ul`
    display: flex;
    padding: 0.5rem;
    margin: 0;
`;

const DateButton = styled.li`
    border-radius: 1rem;
    margin-left: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    text-align: center;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 0.5rem;
    text-align: center;
    line-height: 2rem;
    background-color: white;
    display: flex;
    cursor: pointer;
    &:hover {
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
    &[aria-current] {
        background-color: rgb(200, 200, 200);
    }
`;

const InfoDatination = ({ isShadow, planner, plannerData, drag, onChangeCurPlanId }) => {
    const { plans } = { ...planner };

    // const [currentIndex, setCurrentIndex] = useState(0);
    // // const TOTAL_SLIDES = plans.length;
    const dateRef = useRef();
    const buttonRef = useRef();

    // const handlePrev = () => {
    //     if (currentIndex === 0) {
    //         return;
    //     }
    //     setCurrentIndex((currentIndex) => currentIndex - 1);
    // };
    // const handleNext = () => {
    //     if (currentIndex === plans.length) {
    //         return;
    //     }
    //     setCurrentIndex((currentIndex) => currentIndex + 1);
    // };

    // useEffect(() => {
    //     if (buttonRef) {
    //         const button = buttonRef.current;
    //         const buttonWidth = button.clientWidth;

    //         dateRef.current.style = 'transform: translateX(-' + buttonWidth * currentIndex + 'px)';
    //         dateRef.current.style.transition = 'all 0.5s ease-in-out';
    //     }
    // }, [currentIndex]);

    const letsFormat = (d) => {
        const date = new Date(d);
        return ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
    };

    if (!plans) {
        return <div>Loading...</div>;
    }
    return (
        <InfoDatinationBlock isShadow={isShadow}>
            <Slider list={plans} drag={drag}>
                <DateList>
                    {plans &&
                        plans.map((p, i) => (
                            <DateButton
                                ref={buttonRef}
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
