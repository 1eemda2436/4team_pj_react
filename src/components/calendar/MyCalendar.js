import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import moment from 'moment';
import Link from 'next/link';

const MyCalendar = () => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        // 비동기 함수를 이용해 데이터를 불러옴
        async function fetchData() {
            try {
                const projectResponse = await fetch("http://localhost:8081/project");
                const projectData = await projectResponse.json();
                setProjectList(projectData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        // 데이터 불러오기 함수 호출
        fetchData();
    }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

    const projectEvents = projectList.map(pj => ({
        title: pj.pj_name,
        start: moment(pj.deadline_s).format('YYYY-MM-DD'),
        end: moment(pj.deadline_e).format('YYYY-MM-DD'),
    }));

    const allEvents = [...projectEvents];

    return (
        <Caldiv>
            <FullCalendar 
                plugins={[ dayGridPlugin ]}
                events={allEvents}
                aspectRatio={2.5}
                eventContent={(eventInfo) => (
                    <FullCalendarEventContent>
                        <Link href={`/guest/workspace/ProjectDetail/${eventInfo.event.title}`}>
                                {eventInfo.event.title}
                        </Link>
                    </FullCalendarEventContent>
                    )}
            />
        </Caldiv>
    );
}

export default MyCalendar;

const Caldiv = styled.div `
    width: 100%;
    height: 100%;
`;

const FullCalendarEventContent = styled.div`
    background-color: #3498db;
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
`;