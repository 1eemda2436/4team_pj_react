import styled from "styled-components";
import AdminSideMenu from '@/components/sideMenu/adminSideMenu';

//자식 컴포넌트를 받아 원하는 위치에 출력
const AdminLayout = ({children}) => {
    return (
        <MainComponent>
            <AdminSideMenu />
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
    overflow-x: auto;
`;

export default AdminLayout;