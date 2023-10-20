import MainLayout from "@/components/layout/mainLayout"
import MyCalendar from '@/components/calendar/MyCalendar';
import styled from "styled-components";
import Header from "@/components/common/header";

const Calendar = () => {
    return (
        <MainComponent>
            <Header />
            <MyCalendar />
        </MainComponent>
    );
}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    padding: 0px 50px;
`;