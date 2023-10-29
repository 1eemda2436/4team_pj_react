import MainLayout from "@/components/layout/mainLayout"
import MyCalendar from '@/components/calendar/MyCalendar';
import styled from "styled-components";
import Header from "@/components/common/header";

const Calendar = () => {
    return (
        <>
            <Header />
            <MainComponent>
                <MyCalendar height={800} />
            </MainComponent>
        </>
    );
}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    padding: 20px 50px;
    height: 90%;
    box-sizing: border-box;
`;