import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";

class MyCalendar extends Component {
    render() {
        return (
          <Caldiv>
            <FullCalendar 
              defaultView="dayGridMonth" 
              plugins={[ dayGridPlugin ]}
            />
          </Caldiv>
        );
    }
}
export default MyCalendar;

const Caldiv = styled.div `
    width: 1000px;
    height: 500px;
`;