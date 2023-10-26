import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField'; // 필요한 라이브러리를 import
import styled from "styled-components";
import Header from '@/components/common/header';

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

const Component = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const MyInfoEdit = () => {
    const [memberInfo, setMemberInfo] = useState([]);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if(id) {
            axios
                .get(`http://localhost:8081/guest/my/member/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log('MyInfoEdit] memberInfo', response.data)
                    setMemberInfo(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const MemberInfoChange = (event) => {
        console.log(event.target.value)

        setMemberInfo(prevMember => ({
            ...prevMember, //... => 객체에 사용하면 이전 객체 복사
            [event.target.name]: event.target.value
        }));
    };

    const saveMemberInfo = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token')

        console.log('[saveMemberInfo] memberInfo', memberInfo)

        axios
            .post("http://localhost:8081/guest/my/member/${id}", memberInfo,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                router.push('/guest/my/member/${id}');
            })
            .catch((error) => {
                console.log(erorr);
            });
    }

    return (
        <Component>
            <Header/>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={memberInfo.name || ''}
                            variant="standard"
                            label="사원명"
                            type="text"
                            name="name"
                            placeholder="사원명을 입력해주세요"
                            onChange={MemberInfoChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={memberInfo.email || ''}
                            variant="standard"
                            label="이메일"
                            type="text"
                            name="email"
                            placeholder="이메일을 적어주세요"
                            onChange={MemberInfoChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={memberInfo.tel || ''}
                            variant="standard"
                            type="date"
                            name="tel"
                            placeholder="연락처를 적어주세요"
                            onChange={MemberInfoChange}
                            />
                        </td>
                    </tr>
                    
                </thead>
            </table>

            <button onClick = {saveMemberInfo}>수정</button>
            <button onClick = {() => router.push('/guest/MyPage')}>취소</button>
        </Component>
    )
    
}
export default MyInfoEdit;