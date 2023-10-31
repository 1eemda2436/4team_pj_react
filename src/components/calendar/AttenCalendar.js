import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import Header from '../common/header';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '@/api/apiPath';

function AttenCalendar ({ height }) {
    // 여기에서 달력 옵션을 정의합니다
        const calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth", // 초기 뷰를 선택할 수 있습니다
    };

    const [cfan, setCfan] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios
            .get(`${BASE_URL}/all/attendance/anConfirmList`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setCfan(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
        
    //     // 비동기 함수를 이용해 데이터를 불러옴
    //     async function fetchData() {
    //         try {
    //             const projectResponse = await fetch("http://localhost:8081/all/attendance/anConfirmList", {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             });
    //             const projectData = await projectResponse.json();
    //             setCfan(projectData);
    //         } catch (error) {
    //             console.error("Error fetching data: ", error);
    //         }
    //     }

    //     // 데이터 불러오기 함수 호출
    //     fetchData();
    // }, []); 

    const projectEvents = cfan.map(an => ({
        title: an.annual_title,
        start: moment(an.annual_start).format('YYYY-MM-DD'),
        end: moment(an.annual_end).format('YYYY-MM-DD'),
        id: an.name
    }));

    const allEvents = [...projectEvents];

    return (
        <FullCalendarWrapper>
            <FullCalendar
                height={height ? height : 500}
                plugins={[dayGridPlugin]}
                events={allEvents}
                aspectRatio={2.5}
                firstDay={1}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                {...calendarOptions}
            />
        </FullCalendarWrapper>
    );
};

export default AttenCalendar;

const FullCalendarWrapper  = styled.div`
    width: 100%;

    /* 일요일 날짜 빨간색 */
    .fc-day-sun a {
    color: red;
    text-decoration: none;
    }

    /* 토요일 날짜 파란색 */
    .fc-day-sat a {
    color: blue;
    text-decoration: none;
    }

    /*종일제목*/
    .fc-event-title.fc-sticky{
        text-align: center;
    }

    /*more버튼*/ 
    .fc-daygrid-more-link.fc-more-link{
        color: #000;
    }
    /*일정시간*/
    .fc-daygrid-event > .fc-event-time{
        color:#000;
    }
    /*시간제목*/
    .fc-daygrid-dot-event > .fc-event-title{
        color:#000 !important;
    }

    /*상단버튼*/
    .fc .fc-button-primary {
        background-color: #005FC5;
        border: 1px solid transparent;
    }

    /*이벤트*/
    .fc-h-event {
        background-color: #000;
        border: 1px solid transparent;
    }
`;

