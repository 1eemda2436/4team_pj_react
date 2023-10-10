import styled from 'styled-components';
import AdminMain from '../../../public/asset/icons/adminMain.svg';
import CyberSecurity from '../../../public/asset/icons/CyberSecurity.svg';
import SalaryMale from '../../../public/asset/icons/SalaryMale.svg';
import People from '../../../public/asset/icons/People.svg';
import MaintenanceDate from '../../../public/asset/icons/MaintenanceDate.svg';
import SelectiveHighlighting from '../../../public/asset/icons/SelectiveHighlighting.svg';
import DocumentHeader from '../../../public/asset/icons/DocumentHeader.svg';
import { useRouter } from 'next/router';

function MenuToggle({ menus }) {
    const router = useRouter();

    return (
    <MenuIconDiv onClick={() => router.push(menus.path)}>
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
            value: '메인',
            path: '/admin'
        },
        {   
            id: 2,
            icon: <CyberSecurity />,
            value: '보안관리',
            path: '/admin/security'
        },
        {   
            id: 3,
            icon: <SalaryMale />,
            value: '급여관리',
            path: '/admin/salary'
        },
        {   
            id: 4,
            icon: <People />,
            value: '인사관리',
            path: '/admin'
        },
        {   
            id: 5,
            icon: <MaintenanceDate />,
            value: '근태관리',
            path: '/admin'
        },
        {   
            id: 6,
            icon: <SelectiveHighlighting />,
            value: '전자결재',
            path: '/admin'
        },
        {   
            id: 7,
            icon: <DocumentHeader />,
            value: '게시판관리',
            path: '/admin'
        },
    ];

    return (
        <SideMenu>
            <AdminMinaSideHeader>
                <CompanyManageName>담당자명</CompanyManageName>
                <CompanyBox>
                    <CompanyLogo />
                    <CompanyName>회사명</CompanyName>
                </CompanyBox>
            </AdminMinaSideHeader>
            <MenuIcons>
                {menus.map((menu) => (
                    <MenuToggle menus={menu} key={menu.id} />
                ))}
            </MenuIcons>
            <BottomSpan>사원 페이지 이동</BottomSpan>
        </SideMenu>
    )
}

const MenuIcon = styled.div`
    margin: 0px 12px;
`;


const MenuName = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const MenuIconDiv = styled.div`
    display: flex;
    width: 200px;
    border-bottom: 1px solid #DEDEDE;
    margin-bottom: 30px;
    padding-bottom: 10px;
    align-items: center;
    cursor: pointer;

    &:hover {
        border-bottom: 1px solid #007BFF;
        transition: 0.5s;

        ${MenuName} {
            color: #007BFF;
        }
    }
`;

const SideMenu = styled.div`
    background: #F6F8FA;
    position: relative;
`;

const MenuIcons = styled.div`
    padding: 0px 12px;
    box-sizing: border-box;
    margin-top: 60px;
`;

const AdminMinaSideHeader = styled.div`
    width: 100%;
    height: 210px;
    background: #007BFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
`;

const CompanyManageName = styled.div`
    padding: 8px;
    color: #fff;
    font-size: 14px;
`;

const CompanyBox = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CompanyLogo = styled.div`
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 100%;
`;

const CompanyName = styled.span`
    color: #EFF1F6;
    font-size: 22px;
    font-weight: 600;
    margin-top: 30px;
`;

const BottomSpan = styled.div`
    color: #007BFF;
    font-size: 14px;
    font-weight: 600;
    text-decoration-line: underline;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;