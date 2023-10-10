import MainLayout from "@/components/layout/mainLayout"
import MyCalendar from '@/components/calendar/MyCalendar';
import styled from "styled-components";

const Calendar = () => {
    return (
        <MainComponent>
            <MyCalendar />
        </MainComponent>
    );
}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div``;