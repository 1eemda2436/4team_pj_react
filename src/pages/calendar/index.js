import MainLayout from "@/components/layout/mainLayout"

const Calendar = () => {

}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};