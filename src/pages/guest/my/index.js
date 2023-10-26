import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout";
import Header from "@/components/common/header";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const refreshData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8081/guest/my/memberFind/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
      
        <Title>마이페이지</Title>
        <MainContent>
          <UserInfo>
            <UserInfoLabel>사용자 이름:</UserInfoLabel>
            <UserInfoValue>{data.id}</UserInfoValue>
          </UserInfo>
          <UserInfo>
            <UserInfoLabel>Email:</UserInfoLabel>
            <UserInfoValue>{data.email}</UserInfoValue>
          </UserInfo>
        </MainContent>
      </MainContainer>
    </>
  );
};

export default MyPage;

MyPage.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

const MainContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  text-align: center;
`;

const MainContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 10px 0;
`;

const UserInfo = styled.div`
  display: flex;
  margin: 10px 0;
`;

const UserInfoLabel = styled.div`
  flex: 1;
  font-weight: bold;
`;

const UserInfoValue = styled.div`
  flex: 2;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;