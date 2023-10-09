import MainLayout from "@/components/layout/mainLayout"

const Notice = () => {

}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};