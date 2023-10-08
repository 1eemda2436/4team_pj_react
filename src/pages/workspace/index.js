import MainLayout from "@/components/layout/mainLayout"

const Workspace = () => {

}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};