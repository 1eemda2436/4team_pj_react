import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import moment from 'moment';
import Link from 'next/link';
<<<<<<< HEAD
import { useRouter } from 'next/router';
=======
import axios from 'axios';
>>>>>>> origin/css_refactor

const MyCalendar = () => {
    const [projectList, setProjectList] = useState([]);
    const [cfan, setCfan] = useState([]);
    const [cfva, setCfva] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        // 비동기 함수를 이용해 데이터를 불러옴
        async function fetchData() {
<<<<<<< HEAD
            try {
                const projectResponse = await fetch("http://localhost:8081/guest/project", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const attenResponse = await fetch("http://localhost:8081/all/attendance/anConfirmList", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const vacaResponse = await fetch("http://localhost:8081/all/attendance/vaConfirmList", {
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
=======
            // try {
            //     const projectResponse = await fetch("http://localhost:8081/guest/project", {
            //         headers: {
            //             'Authorization': `Bearer ${token}`
            //         }
            //     });
            //     const projectData = await projectResponse.json();
            //     setProjectList(projectData);
            // } catch (error) {
            //     console.error("Error fetching data: ", error);
            // }
            axios.get("http://localhost:8081/guest/project",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
>>>>>>> origin/css_refactor
        }

        // 데이터 불러오기 함수 호출
        fetchData();
    }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때 한 번만 실행

    const projectEvents = projectList.map(pj => ({
        title: pj.pj_name,
        start: moment(pj.deadline_s).format('YYYY-MM-DD'),
        end: moment(pj.deadline_e).format('YYYY-MM-DD'),
        id: pj.pj_id
    }));

    const annualEvents = cfan.map(an => ({
        title: an.annual_title,
        start: moment(an.annual_start).format('YYYY-MM-DD'),
        end: moment(an.annual_end).format('YYYY-MM-DD'),
        id: an.name
    }));

    const vacationEvents = cfva.map(va => ({
        title: va.vacation_title,
        start: moment(va.vacation_start).format('YYYY-MM-DD'),
        end: moment(va.vacation_end).format('YYYY-MM-DD'),
        id: va.name
    }));

    const allEvents = [...projectEvents, ...annualEvents, ...vacationEvents];

    return (
        <Caldiv>
            <FullCalendar 
                plugins={[ dayGridPlugin ]}
                events={allEvents}
                aspectRatio={2.5}
                eventContent={(eventInfo) => (
                    <FullCalendarEventContent>
                        <Link href={`/guest/workspace/ProjectDetail/${eventInfo.event.id}`}>
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