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

function MenuToggle({ menus }) {
    return (
      <MenuIconDiv>
        <MenuIcon>{menus.icon}</MenuIcon>
        <MenuName>{menus.value}</MenuName>
      </MenuIconDiv>
    );
  }

export default function MainSideMenu() {
    const menus = [
        {   
            id: 1,
            icon: <Alerts />,
            value: '알림'
        },
        {
            id: 2,
            icon: <Video_Conference />,
            value: '워크스페이스'
        },
        {
            id: 3,
            icon: <Time />,
            value: '근태관리'
        },
        {   
            id: 4,
            icon: <Calendar />,
            value: '캘린더'
        },
        {
            id: 5,
            icon: <Chat />,
            value: '메신저'
        },
        {
            id: 6,
            icon: <Megaphone />,
            value: '공지사항'
        },
        {
            id: 7,
            icon: <Forms />,
            value: '전자결재'
        },
        {
            id: 8,
            icon: <Badge />,
            value: '인사관리'
        },
        {
            id: 9,
            icon: <Bank />,
            value: '급여관리'
        },
        {
            id: 10,
            icon: <Working_Together />,
            value: '커뮤니티'
        },
    ];

    return (
        <SideMenu>
            <Logo1 />
            <MenuIcons>
                {menus.map((menu) => (
                    <MenuToggle menus={menu} key={menu.id} />
                ))}
            </MenuIcons>
            <LogoutIcon />
        </SideMenu>
    )
}

const SideMenu = styled.div`
    width: 80px;
    height: 100vh;
    background-color: #005FC5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px;
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
    padding: 11px 0px;
    margin-bottom: 10px;
    cursor: pointer;
   
    &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        transition: 0.5s;
    }
`;

const MenuIcon = styled.div`

`;

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
