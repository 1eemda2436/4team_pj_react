import MainLayout from "@/components/layout/mainLayout"

const Doc = () => {

}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};