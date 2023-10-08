import MainLayout from "@/components/layout/mainLayout"

const Guest = () => {
    return(
        <div>
            test
        </div>
    )
};

export default Guest;

Guest.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};