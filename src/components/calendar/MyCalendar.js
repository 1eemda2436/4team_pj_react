import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BASE_URL } from '@/api/apiPath';

const MyCalendar = ({ height }) => {
    const [projectList, setProjectList] = useState([]);
    const [cfan, setCfan] = useState([]);
    const [cfva, setCfva] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const team_id = localStorage.getItem('team_id')
        
        // 비동기 함수를 이용해 데이터를 불러옴
        async function fetchData() {
            try {
                const projectResponse = await fetch(`${BASE_URL}/guest/project/list/${team_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const attenResponse = await fetch(`${BASE_URL}/all/attendance/anConfirmList`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const vacaResponse = await fetch(`${BASE_URL}/all/attendance/vaConfirmList`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const projectData = await projectResponse.json();
                const attenData = await attenResponse.json();
                const vacaData = await vacaResponse.json();
                setProjectList(projectData);
                setCfan(attenData);
                setCfva(vacaData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        // 데이터 불러오기 함수 호출
        fetchData();
    }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

    const projectEvents = projectList.length > 0
        ? projectList.map(pj => ({
            title: pj.pj_name,
            start: moment(pj.deadline_s).format('YYYY-MM-DD'),
            end: moment(pj.deadline_e).format('YYYY-MM-DD'),
            id: pj.pj_id
        }))
    : [];

    const annualEvents = cfan.length > 0
        ? cfan.map(an => ({
            title: an.annual_title,
            start: moment(an.annual_start).format('YYYY-MM-DD'),
            end: moment(an.annual_end).format('YYYY-MM-DD'),
            id: an.name
        }))
    : [];

    const vacationEvents = cfva.length > 0
        ? cfva.map(va => ({
            title: va.vacation_title,
            start: moment(va.vacation_start).format('YYYY-MM-DD'),
            end: moment(va.vacation_end).format('YYYY-MM-DD'),
            id: va.name
        }))
    : [];

    const allEvents = [...projectEvents, ...annualEvents, ...vacationEvents];

    return (
        <FullCalendarWrapper>
            <FullCalendar 
                height={height ? height : 900}
                plugins={[ dayGridPlugin ]}
                events={allEvents}
                aspectRatio={2.5}
                eventContent={(eventInfo) => (
                    <FullCalendarEventContent>
                        <EventTitle onClick={() => router.push(`/guest/workspace/ProjectDetail/${eventInfo.event.id}`) }>
                            {eventInfo.event.title}
                        </EventTitle>
                    </FullCalendarEventContent>
                )}
                firstDay={1}
            />
        </FullCalendarWrapper>
    );
}

export default MyCalendar;

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

const FullCalendarEventContent = styled.div`
    background-color: #000;
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
    border: none;
    border: 1px solid transparent;
`;

const EventTitle = styled.div``;