import styled from "styled-components";
import MainSideMenu from '@/components/sideMenu/mainSideMenu';

//자식 컴포넌트를 받아 원하는 위치에 출력
const MainLayout = ({children}) => {
    return (
        <MainComponent>
            <MainSideMenu />
            <Content>{children}</Content>
        </MainComponent>
    )
}

const MainComponent = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
`;

const Content = styled.div`
    width: 100%;
`;

export default MainLayout;