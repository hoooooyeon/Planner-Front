import styled from 'styled-components';

const EditCalendarBlock = styled.div`
    z-index: 1;
    position: relative;
    left: 4px;
`;

const Calendar = styled.div`
    background-color: #f1eee0;
    border: 0.2rem solid #cdd9ac;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-top: 16px;
    position: relative;
    & + & {
        margin: 8px 0;
    }
    &:hover {
        cursor: pointer;
        border-width: 0.3rem;
        margin-right: -0.6rem;
    }
    &[aria-current] {
        background-color: #cdd9ac;
    }
`;

const RouteLine = styled.div`
    background-color: #cdd9ac;
    width: 0.2rem;
    height: 73px;
    position: absolute;
    left: 24px;
    top: -23px;
    z-index: -1;
`;

const EditCalendar = () => {
    return (
        <EditCalendarBlock>
            <Calendar aria-current={true ? 'date' : null}>
                <RouteLine />
                11/11
            </Calendar>
            <Calendar>
                <RouteLine />
                11/12
            </Calendar>
            <Calendar>
                <RouteLine />
                11/13
            </Calendar>
        </EditCalendarBlock>
    );
};

export default EditCalendar;
