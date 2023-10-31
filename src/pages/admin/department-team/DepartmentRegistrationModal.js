import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { BASE_URL } from '@/api/apiPath';

const DepartmentRegistrationModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        depart_name: '',
        company_id : 1
    });

    
    const handleFormSubmit = async (e) => {
        const token = localStorage.getItem('token')
        e.preventDefault();

        try {
            console.log(formData.depart_name);
            await axios.post(`${BASE_URL}/admin/department/DepartmentInsert`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        // 성공 처리
        onSave(); // 저장 후 처리
        window.location.reload();
        } catch (error) {
        // 오류 처리
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <Title>부서 등록</Title>
                <Form onSubmit={handleFormSubmit}>
                    <label>
                        부서 명:
                        <input
                            type="text"
                            name="depart_name"
                            value={formData.depart_name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                <CancelButton type="submit">등록</CancelButton>
                <br />
                <CancelButton onClick={onClose}>취소</CancelButton>
                </Form>
            </ModalContent>
        </ModalWrapper>
    );
};

export default DepartmentRegistrationModal;

    const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    `;

    const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 300px;
    `;

    const Title = styled.h2`
    font-size: 20px;
    margin: 0 0 20px;
    `;

    const Form = styled.form`
    display: flex;
    flex-direction: column;

    label {
        font-weight: bold;
        margin-bottom: 10px;
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    `;

    const CancelButton = styled.button`
    background-color: #ccc;
    margin-right: 10px;
    `;