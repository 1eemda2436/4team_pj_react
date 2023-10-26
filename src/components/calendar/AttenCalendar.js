import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import Header from '../common/header';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from 'moment';

function AttenCalendar () {
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
            .get('http://localhost:8081/all/attendance/anConfirmList', {
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
        <FullCalendar
        plugins={[dayGridPlugin]}
        events={allEvents}
        headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        {...calendarOptions}
        />
    );
};

export default AttenCalendar;

