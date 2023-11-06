import { useEffect, useState } from "react";
import styled from "styled-components";

const GuestClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date());
        }, 1000);

        return () => {
        clearInterval(intervalId);
        };
    }, []);

    const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , second: '2-digit' });
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

    // "오후"를 포함하는 경우, "오후"를 제거하고 AM 또는 PM을 표시
    const formattedTime = currentTime.includes("오후") ? currentTime.replace("오후", ampm) : currentTime + " " + ampm;

    return (
        <ClockContainer>
            <DigitalClock>{formattedTime}</DigitalClock>
        </ClockContainer>
    );
}

export default GuestClock;

const ClockContainer = styled.div`
    text-align: center;
    font-family: "Digital-7", sans-serif;
    font-size: 150px;
    padding: 60px;
    color: #FFFFFF;
    width: 1000px;
    margin: 0 auto;
`;

const DigitalClock = styled.div`
    font-weight: bold;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 1.0);
    font-size: 100px;
`;
