import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TeamUpdateModal = ({ onClose, onUpdate, team_id, team_name,depart_id }) => {
    const [updatedTeamData, setUpdatedTeamData] = useState({
        team_id:team_id,
        team_name:team_name,
        depart_id:depart_id
    });

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            // PUT 요청을 보냅니다.
            await axios.put(`http://localhost:8081/admin/team/TeamUpdate`, updatedTeamData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
                },
            });
            // 성공 시 로직
            onUpdate(); // 팀 현황 화면을 업데이트하거나 모달을 닫을 수 있습니다.
            window.location.reload();
        } catch (error) {
            // 오류 처리
            console.error('팀 수정 중 오류 발생:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTeamData({ ...updatedTeamData, [name]: value });
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <Title>팀 수정</Title>
                <div>
                    <p>팀 번호 : {updatedTeamData.team_id}</p>
                </div>
                <Form onSubmit={handleUpdate}>
                    <label>
                        팀명:
                        <input
                            type="text"
                            name="team_name"
                            value={updatedTeamData.team_name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <UpdateButton type="submit">수정</UpdateButton>
                    <br />
                    <CancelButton onClick={onClose}>취소</CancelButton>
                </Form>
            </ModalContent>
        </ModalWrapper>
    );
};

export default TeamUpdateModal;

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

const UpdateButton = styled.button`
    background-color: #007bff;
    margin-right: 10px;
`;

const CancelButton = styled.button`
    background-color: #ccc;
`;