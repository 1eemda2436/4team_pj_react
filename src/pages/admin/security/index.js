import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";

const SecurityManagement = () => {
  const [authorityStatus, setAuthorityStatus] = useState({
    security: false,
    attendance: false,
    salary: false,
    approval: false,
    personnel: false,
    board: false,
  });

  const toggleAuthority = (authority) => {
    setAuthorityStatus((prevStatus) => ({
      ...prevStatus,
      [authority]: !prevStatus[authority],
    }));
  };

  return (
    <MainComponent>
        <Title>권한관리</Title>

        <TopBox>
          <InputBox>
            <InputAccordion>
              <span>직책</span>
              <KeyboardArrowDownIconStyle />
            </InputAccordion>

            <InputAccordion>
              <span>이름</span>
              <KeyboardArrowDownIconStyle />
            </InputAccordion> 
          </InputBox>

          <HowToRegIconStyle />
        </TopBox>

        <BottomBox>
          <AuthorityDiv
            isActive={authorityStatus.security}
            onClick={() => toggleAuthority('security')}
          >
            보안관리
          </AuthorityDiv>
          <AuthorityDiv
            isActive={authorityStatus.attendance}
            onClick={() => toggleAuthority('attendance')}
          >
            근태관리
          </AuthorityDiv>
          <AuthorityDiv
            isActive={authorityStatus.salary}
            onClick={() => toggleAuthority('salary')}
          >
            급여관리
          </AuthorityDiv>
          <AuthorityDiv
            isActive={authorityStatus.approval}
            onClick={() => toggleAuthority('approval')}
          >
            전자결재관리
          </AuthorityDiv>
          <AuthorityDiv
            isActive={authorityStatus.personnel}
            onClick={() => toggleAuthority('personnel')}
          >
            인사관리
          </AuthorityDiv>
          <AuthorityDiv
            isActive={authorityStatus.board}
            onClick={() => toggleAuthority('board')}
          >
            게시판관리
          </AuthorityDiv>
        </BottomBox>
    </MainComponent>
  );
}

export default SecurityManagement;

SecurityManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainComponent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  padding: 0px 10px;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  display: flex;
  width: 100%;
`;

const InputAccordion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;
  background: white;
  border: 1px solid #999;
  border-radius: 5px;
  padding: 10px 20px;
  color: gray;
  margin: 0px 5px;
`;

const KeyboardArrowDownIconStyle = styled(KeyboardArrowDownIcon)`
  cursor: pointer;
`;

const HowToRegIconStyle = styled(HowToRegIcon)`
  cursor: pointer;
  font-size: 34px;
  margin-left: 30px;

  &:hover{
    color: #007bff
  }
`;

const BottomBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
  row-gap: 15px;
  margin-top: 30px;
`;

const AuthorityDiv = styled.div`
  background: #eff1f6;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  border-radius: 5px;
  padding: 20px 0px;
  cursor: pointer;

  ${({ isActive }) => isActive && `
    background-color: #007BFF;
    color: #fff;
  `}
`;