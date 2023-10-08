import styled from 'styled-components';
import AdminMain from '../../../public/asset/icons/adminMain.svg';
import CyberSecurity from '../../../public/asset/icons/CyberSecurity.svg';
import SalaryMale from '../../../public/asset/icons/SalaryMale.svg';
import People from '../../../public/asset/icons/People.svg';
import MaintenanceDate from '../../../public/asset/icons/MaintenanceDate.svg';
import SelectiveHighlighting from '../../../public/asset/icons/SelectiveHighlighting.svg';
import DocumentHeader from '../../../public/asset/icons/DocumentHeader.svg';

function MenuToggle({ menus }) {
    return (
    <MenuIconDiv>
        <MenuIcon>{menus.icon}</MenuIcon>
        <MenuName>{menus.value}</MenuName>
    </MenuIconDiv>
    );
  }

export default function adminSideMenu() {
    //메뉴 요소 배열 
    const menus = [
        {   
            id: 1,
            icon: <AdminMain />,
            value: '메인'
        },
        {   
            id: 2,
            icon: <CyberSecurity />,
            value: '보안관리'
        },
        {   
            id: 3,
            icon: <SalaryMale />,
            value: '급여관리'
        },
        {   
            id: 4,
            icon: <People />,
            value: '인사관리'
        },
        {   
            id: 5,
            icon: <MaintenanceDate />,
            value: '근태관리'
        },
        {   
            id: 6,
            icon: <SelectiveHighlighting />,
            value: '전자결재'
        },
        {   
            id: 7,
            icon: <DocumentHeader />,
            value: '게시판관리'
        },
    ];

    return (
        <SideMenu>
            <AdminMinaSideHeader>
                <CompanyLogoDiv />
            </AdminMinaSideHeader>
            <MenuIcons>
                {menus.map((menu) => (
                    <MenuToggle menus={menu} key={menu.id} />
                ))}
            </MenuIcons>
        </SideMenu>
    )
}

const MenuIcon = styled.div`
    margin-right: 10px;
`;


const MenuName = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const MenuIconDiv = styled.div`
    display: flex;
    width: 200px;
    border-bottom: 1px solid #DEDEDE;
    margin-bottom: 25px;
`;

const SideMenu = styled.div`
    background: #F6F8FA;
    
`;

const MenuIcons = styled.div`
    padding: 0px 12px;
    box-sizing: border-box;
    margin-top: 60px;
`;

const AdminMinaSideHeader = styled.div`
    width: 100%;
    height: 200px;
    background: #007BFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const CompanyLogoDiv = styled.div`
    width: 80px;
    height: 80px;
    
    background: #fff;
    border-radius: 100%;
    
`;