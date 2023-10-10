import styled from "styled-components";
import Logo2 from '../../../public/asset/icons/logo2.svg';
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  return (
    <Component>
      <Logo2 />
      <LoginInputBox>
        <LoginInput placeholder="ID" type="text" />
        <LoginInput placeholder="PASSWORD" type="password" />

        <LoginBtn> login </LoginBtn>
        <JoinBtn onClick={() => router.push('/join')}>사업자 등록</JoinBtn>
      </LoginInputBox>
    </Component>
  )
}

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