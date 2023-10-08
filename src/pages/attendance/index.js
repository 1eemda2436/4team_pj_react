import MainLayout from "@/components/layout/mainLayout"

const Attendance = () => {
    return(
        <h1>
            test
        </h1>

    )
}

export default Attendance;

Attendance.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};