import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";

const Notice = () => {
    return(
        <MainComponent>
            
        </MainComponent>
    )
}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;