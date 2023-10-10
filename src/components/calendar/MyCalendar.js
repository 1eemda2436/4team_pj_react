import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";

const MyCalendar = () => {
    return (
        <Caldiv>
            <FullCalendar 
                plugins={[ dayGridPlugin ]}
            />
        </Caldiv>
    );
}

export default MyCalendar;

const Caldiv = styled.div `
    width: 1000px;
    height: 500px;
`;
