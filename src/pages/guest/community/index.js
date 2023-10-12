import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout"
import Header from "@/components/common/header";

const Community = () => {
    return(
        <MainComponent>
            <Header />
        </MainComponent>
    )
}

export default Community;

Community.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;