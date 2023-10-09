import MainLayout from "@/components/layout/mainLayout"
import ProjectAdd from "./ProjectAdd"
const Workspace = () => {
    return (
        <div className="App">
          <ProjectAdd />
        </div>
      );

}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

