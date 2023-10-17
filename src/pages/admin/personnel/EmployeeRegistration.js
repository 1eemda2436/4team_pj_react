import AdminLayout from "@/components/layout/adminLayout";
import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const EmployeeRegistration = () => {
  // Define state to hold form data
  const [formData, setFormData] = useState({
    employeeName: '',
    phoneNumber: '',
    hireDate: '',
  });

  // Handle input changes and update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Make a POST request to your Spring Boot API
      await axios.post('http://localhost:8080/employeeInsert', formData);

      // Optionally, you can handle success or show a message to the user
      alert('Employee registered successfully');
    } catch (error) {
      // Handle any errors, e.g., network issues or server errors
      console.error('Error:', error);
      alert('Failed to register employee');
    }
  };

  return (
    <Container>
      <Title>인사 관리 - 사원 등록</Title>
      <FormSection>
        <Label>사원명</Label>
        <Input
          type="text"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          placeholder="사원명"
        />
        <Label>전화번호</Label>
        <Input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="전화번호"
        />
        <Label>입사일</Label>
        <Input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
        />
      <ButtonContainer>
        <Button onClick={handleSubmit}>등록</Button>
      </ButtonContainer>
      </FormSection>
    </Container>
  );
};

export default EmployeeRegistration;

EmployeeRegistration.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  padding: 10px 0;
  text-align: center;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const Label = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;
