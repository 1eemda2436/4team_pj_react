import MainLayout from "@/components/layout/mainLayout"
import MyCalendar from './MyCalendar';

const Calendar = () => {
    return (
        <div>
          <MyCalendar />
        </div>
      );
}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};