import styled from "styled-components";
import Logo1 from '../../../public/asset/icons/logo1.svg'
import Alerts from '../../../public/asset/icons/Alerts.svg';
import Badge from '../../../public/asset/icons/Badge.svg';
import Bank from '../../../public/asset/icons/Bank.svg';
import Calendar from '../../../public/asset/icons/Calendar.svg';
import Chat from '../../../public/asset/icons/Chat.svg';
import Forms from '../../../public/asset/icons/Forms.svg';
import Megaphone from '../../../public/asset/icons/Megaphone.svg';
import Time from '../../../public/asset/icons/Time.svg';
import Video_Conference from '../../../public/asset/icons/Video_Conference.svg';
import Working_Together from '../../../public/asset/icons/Working_Together.svg';
import Logout from '../../../public/asset/icons/logout.svg'
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//menu 아이콘, 제목 스타일 함수
function MenuToggle({ menus }) {
    const router = useRouter();
    return (
        <MenuIconDiv onClick={() => router.push(menus.path)}>
            <MenuIcon>{menus.icon}</MenuIcon>
            <MenuName>{menus.value}</MenuName>
        </MenuIconDiv>
    );
}

export default function MainSideMenu() {
    const router = useRouter();
    const [auth, setAuth] = useState(false);

    const logoutToggle = () => {
        localStorage.clear();
        router.push('/');
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const auth = localStorage.getItem('auth');
            if (auth === 'ROLE_ADMIN') {
                setAuth(true);
            }
        }
        
    }, []); // 빈 배열로 설정

    //메뉴 요소 배열 
    const menus = [
        {
            id: 0,
            icon: <HomeIconStyle />,
            value: '홈',
            path: '/guest'
        },
        {
            id: 1,
            icon: <Video_Conference />,
            value: '워크스페이스',
            path: '/guest/workspace'
        },
        {   
            id: 2,
            icon: <Calendar />,
            value: '캘린더',
            path: '/guest/calendar'
        },
        // {
        //     id: 3,
        //     icon: <Chat />,
        //     value: '메신저',
        //     path: '/guest/chatting'
        // },
        {
            id: 4,
            icon: <Megaphone />,
            value: '공지사항',
            path: '/guest/notice'
        },
        {
            id: 5,
            icon: <Forms />,
            value: '전자결재',
            path: auth ? '/admin/doc' : '/guest/doc'
        },
        {
            id: 6,
            icon: <Time />,
            value: '근태관리',
            path: auth ? '/admin/attendance' : '/guest/attendance'
        },
        {
            id: 7,
            icon: <Badge />,
            value: '인사관리',
            path: auth ? '/admin/personnel' : '/guest/personnel'
        },
        {
            id: 8,
            icon: <Bank />,
            value: '급여관리',
            path: auth ? '/admin/salary' : '/guest/salary'
        },
        {
            id: 9,
            icon: <Working_Together />,
            value: '커뮤니티',
            path: '/guest/community'
        },
    ];

    return (
        <SideMenu>
            <Logo1Icon onClick={() => router.push('/guest')}/>
            <MenuIcons>
                {menus.map((menu) => (
                    <MenuToggle menus={menu} key={menu.id} />
                ))}
            </MenuIcons>
            <LogoutIcon onClick={logoutToggle} />
        </SideMenu>
    )
}

const SideMenu = styled.div`
    width: 110px;
    background-color: #005FC5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
`;

const Logo1Icon = styled(Logo1)`
    cursor: pointer;
    margin-bottom: 20px;
`;

const MenuIcons = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 26px;
`;

const MenuIconDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px 0px;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        transition: 0.5s;
    }
`;

const MenuIcon = styled.div``;

const MenuName = styled.div`
    font-size: 10px;
    color: white;
    margin-top: 2px;
`;

const LogoutIcon = styled(Logout)`
    cursor: pointer;
    position: absolute;
    bottom: 13px;
`; 

const HomeIconStyle = styled(HomeIcon)`
    font-size: 30px;
    color: #fff;
`;