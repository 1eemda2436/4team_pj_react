import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const EditDepartmentModal = ({ onClose, onSave, depart_id, depart_name }) => {
    const [formData, setFormData] = useState({
        depart_id: depart_id,
        depart_name: depart_name,
        company_id: 1
    });

    // useEffect를 사용하여 부서 정보 및 부서 번호를 가져옵니다.
    useEffect(() => {
        //setDepartNumber(depart_id)
        console.log(depart_id)
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8081/admin/department/GetDepartmentById/${depart_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            // 가져온 부서 정보와 부서 번호를 업데이트합니다.
            setFormData({
                ...formData,
                depart_id: response.data.depart_id,
                depart_name: response.data.depart_name
            });
        })
        .catch(error => {
            // 에러 처리
        });
    }, [depart_id]);

    const handleFormSubmit = async (e) => {
        const token = localStorage.getItem('token');
        e.preventDefault();

        try {
            console.log(formData.depart_id);
            await axios.put(`http://localhost:8081/admin/department/DepartmentUpdate`, formData, {
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
                <Title>부서 수정</Title>
                <div>
                    <p>부서 번호: {formData.depart_id}</p> {/* 부서 번호를 출력 */}
                </div>
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
                    <SaveButton type="submit">저장</SaveButton>
                    <br />
                    <SaveButton onClick={onClose}>취소</SaveButton>
                </Form>
            </ModalContent>
        </ModalWrapper>
    );
};

export default EditDepartmentModal;


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
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;

const CancelButton = styled.button`
    background-color: #ccc;
    margin-right: 10px;
`;
