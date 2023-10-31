import styled from "styled-components";
import Logo2 from '../../public/asset/icons/logo2.svg';
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react";
import rootStore from "@/stores/rootStore";
import { BASE_URL } from "@/api/apiPath";

const Login = () => {
  const [loginData, setLoginData] = useState({
    id: "",
    pwd: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();

    const { id, pwd } = loginData;

    // 요청 본문 데이터
    const data = { id, pwd };

    axios.post(`${BASE_URL}/`, data)
      .then((response) => {
        alert("로그인 성공")
        console.log('로그인 성공:', response.data);

        // RootStore의 login 메서드를 호출하여 로그인 상태 및 토큰을 업데이트
        rootStore.login(response.data.token);

        // MemberStore의 setMemberData 메서드를 호출하여 멤버 데이터를 업데이트
        rootStore.MemberStore.setMemberData(response.data);
        localStorage.setItem('auth', rootStore.MemberStore.member.authority);
        localStorage.setItem('user_id', rootStore.MemberStore.member.id);
        localStorage.setItem('company_id', rootStore.MemberStore.member.company_id);
        localStorage.setItem('depart_id', rootStore.MemberStore.member.depart_id);
        localStorage.setItem('team_id', rootStore.MemberStore.member.team_id);
        localStorage.setItem('user_name', rootStore.MemberStore.member.name);
        localStorage.setItem('admin_sign', rootStore.MemberStore.member.admin_sign);
        console.log(rootStore.MemberStore.member.id);

        localStorage.setItem('token', response.data.token);
        router.push('/guest');
      })
      .catch((error) => {
        console.error('로그인 실패:', error);
    });
  }

  const router = useRouter();

  return (
      <Component>
        <Logo2 />
        <LoginInputBox>
          <LoginInput name="id" placeholder="ID" type="text" onChange={onChangeHandler} />
          <LoginInput name="pwd" placeholder="PASSWORD" type="password" onChange={onChangeHandler} />

          <LoginBtn onClick={(e) => onSubmitLogin(e)}> login </LoginBtn>
          <JoinBtn onClick={() => router.push('/join')}>사업자 등록</JoinBtn>
        </LoginInputBox>
      </Component>
  )
}

export default observer(Login);

const Component = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-top: 48px;
`;

const LoginInput = styled.input`
  border-radius: 5px;
  border: 1px solid #CBCBCB;
  background: #F8F8F8;
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: 15px;
  font-size: 18px;
  padding-left: 22px;

  ::placeholder {
    margin-left: 22px;
    color: #D9D9D9;
  }
`;

const LoginBtn = styled.div`
  border-radius: 5px;
  border: 1px solid #CBCBCB;
  background: #007BFF;
  width: 100%;
  height: 72px; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  font-weight: 600;
  margin-top: 28px;
  cursor: pointer;
  padding: 0px 11px;
`;

const JoinBtn = styled.div`
  color: #5C9DFF;
  font-size: 18px;
  font-weight: 700;
  margin-top: 21px;
  cursor: pointer;
`;