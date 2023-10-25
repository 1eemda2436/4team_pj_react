import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import SelectBox from "@/components/form/selectBox";
import axios from "axios";

const AdminSecurityManagement = () => {

  const [data, setData] = useState({
    id: null,
    name: null
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const company_id = localStorage.getItem('company_id')
    // Axios를 사용하여 Spring Boot 백엔드에서 데이터 가져오기
    axios.get(`http://localhost:8081/admin/personnel/employeeSelectAll/${company_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => { 
        const data = response.data.map(item => ({
          id: item.id,
          name: `(${item.rank}) ${item.name}`
        }));

        setData(data);
        
        console.log(response.data)
        console.log(data)
      })
      .catch(err => {
        if (axios.isAxiosError(err)) {
          console.log(err.message)
        } else {
          alert('데이터를 불러오는 중 오류가 발생했습니다.')
        }
      });
  }, []);

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

    console.log(authorityStatus)
  };

  console.log(data)

  return (
    <MainComponent>
        <Title>권한관리</Title>

        <BoxContainer>
          <TopBox>
            <InputBox>
              <SelectBox 
                label='권한을 부여할 사원을 선택하세요.'
                itemData={data}
              />
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
        </BoxContainer>
    </MainComponent>
  );
}

export default AdminSecurityManagement;

AdminSecurityManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainComponent = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const BoxContainer = styled.div`
  margin: 0px 20%;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  padding: 0px 10px;
  box-sizing: border-box;
`;

const InputBox = styled.div`
  display: flex;
  width: 50%;
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
  margin-left: 30px;
  width: 1.3em;
  height: auto;
  
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