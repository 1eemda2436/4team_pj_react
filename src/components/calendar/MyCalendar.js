import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";

const MyCalendar = () => {
    return (
        <Caldiv>
            <FullCalendar 
                plugins={[ dayGridPlugin ]}
                aspectRatio={2.5}
            />
        </Caldiv>
    );
}

export default MyCalendar;

const Caldiv = styled.div `
    width: 2300px;
    height: 400px;
    
`;
