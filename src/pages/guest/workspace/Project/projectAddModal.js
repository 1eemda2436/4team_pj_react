import React, { useState } from 'react';
import axios from 'axios';
import styled from "styled-components";

const ProjectAddModal = ({ onClose, onSave }) => {
    const team_id = localStorage.getItem('team_id')
    const [formData, setFormData] = useState({
        team_id : team_id,
        content : '',
        deadline_s : new Date().toISOString().slice(0, 10), // 현재 날짜를 ISO 형식으로 가져오기
        deadline_e : '',
    });
    
    const handleFormSubmit = async (e) => {
        const token = localStorage.getItem('token')
        e.preventDefault();

        try {
            console.log(formData.depart_name);
            await axios.post(`http://localhost:8081/guest/project/pjadd`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        // 성공 처리
        onSave(); // 저장 후 처리
        //window.location.reload();
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
                <Title>프로젝트 등록</Title>
                <Form onSubmit={handleFormSubmit}>
                    <label>
                        프로젝트 명 :
                        <input
                            required
                            type="text"
                            name="pj_name"
                            placeholder="프로젝트 이름을 적어주세요"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        프로젝트 설명 :
                        <input
                            required
                            type="text"
                            name="content"
                            placeholder="프로젝트 이름을 적어주세요"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Start :
                        <input
                            required
                            type="date"
                            name="deadline_s"
                            value={formData.deadline_s}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        기한일 :
                        <input
                            required
                            type="date"
                            name="deadline_e"
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

export default ProjectAddModal;

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