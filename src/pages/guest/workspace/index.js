import MainLayout from "@/components/layout/mainLayout"
import WorkspaceMain from "./WorkspaceMain";

const Workspace = () => {
    return (
        <div>
            <WorkspaceMain/>
        </div>
       
    )

}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};