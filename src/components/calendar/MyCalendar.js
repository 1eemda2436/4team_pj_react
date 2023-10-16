import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import Header from '../common/header';

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
    width: 100%;
    height: 100%;
    
`;
