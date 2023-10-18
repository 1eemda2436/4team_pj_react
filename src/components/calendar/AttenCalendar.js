import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from "styled-components";
import Header from '../common/header';

const AttenCalendar = () => {
    // 여기에서 달력 옵션을 정의합니다
        const calendarOptions = {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth", // 초기 뷰를 선택할 수 있습니다
        events: [
        // 여기에서 이벤트를 정의합니다
        {
            title: "개발자 회의",
            date: "2023-10-27",
        },
        {
            title: "이다혜 연차",
            date: "2023-10-13",
        },
        {
            title: "김동건 휴가",
            start: "2023-10-13",
            end: "2023-10-16"
        },
        {
            title: "이승민 산재 입원",
            start: "2023-10-13",
            end: "2023-11-13"
        },
        // 필요한 만큼 이벤트를 추가하세요
        ],
    };

    return (
        <FullCalendar
        plugins={[dayGridPlugin]}
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

