import styled from "styled-components";
import MainSideMenu from '@/components/sideMenu/mainSideMenu';

const MainLayout = () => {

    return (
        <MainComponent>
            <MainSideMenu />
        </MainComponent>
    )
}

const MainComponent = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

export default MainLayout;