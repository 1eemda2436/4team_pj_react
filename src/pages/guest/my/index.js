import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout";
import rootStore from "@/stores/rootStore";
import Header from "@/components/common/header";

const MyPage = () => {
    const token = localStorage.getItem('token')
    console.log(rootStore)

    return(
        <>
            <Header/>
            <MainComponent>

            </MainComponent>
        </>
    )
}

export default MyPage;

MyPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 90%;
`;
