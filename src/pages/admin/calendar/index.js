import MainLayout from "@/components/layout/mainLayout"

const Calendar = () => {
    return (
        <div>
            test
        </div>
    );
}

export default Calendar;

Calendar.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};