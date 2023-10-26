import MainLayout from "@/components/layout/mainLayout"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const id = router.query.id; // ID를 추출
    console.log(id)

    const [leftList, setLeftList] = useState([]);
    const [rightList, setRightList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/guest/doc/memberAll/${id}`)
        .then((response) => {
            setLeftList(response.data);
        })
        .catch((error) => {
            console.error('넘기기 실패!', error);
        });

        axios.get(`http://localhost:8081/guest/doc/memberOne/${id}`)
        .then((response) => {
            setRightList([response.data]);
        })
        .catch((error) => {
            console.error('넘기기 또 실패!', error);
        });
    }, []);

    const moveR = () => {
    // 왼쪽 목록에서 선택된 항목의 ID를 가져오기
    const selectedItemId = document.querySelector('select[name="memberList"]').value;

    // 이미 오른쪽 목록에 있는지 확인
    if (rightList.find(item => item.id === selectedItemId)) {
        console.log('이미 추가된 항목입니다.');
        return;
    }

    // 왼쪽 목록에서 선택된 항목을 찾아서 오른쪽 목록에 추가
    const selectedItem = leftList.find(item => item.id === selectedItemId);
    if (selectedItem) {
        setRightList([...rightList, selectedItem]);

        // 왼쪽 목록에서 선택된 항목을 제거
        setLeftList(leftList.filter(item => item.id !== selectedItemId));
        }
    };

    const moveL = () => {
    const selectedItemId = document.querySelector('select[name="selectedMemberList"]').value;

    if (leftList.find(item => item.id === selectedItemId)) {
        console.log('이미 추가된 항목입니다.');
        return;
    }

    const selectedItem = rightList.find(item => item.id === selectedItemId);
    if (selectedItem) {
        setLeftList([...leftList, selectedItem]);

        setRightList(rightList.filter(item => item.id !== selectedItemId));
        }  
    };

    const Complete = () => {

        console.log('결재선 추가 완료.');
    }

    const Cancel = () => {
    
        console.log('결재선 추가 취소.');
    }

    return(
        <Container>
            <H1>사원 결재선</H1>
                <MemberListTable>
                    <tr>
                        <td>사원 목록</td>
                        <td></td>
                        <td>선택된 사원 목록</td>
                    </tr>
                    <tr>
                        <Td1>
                    {leftList.map((member) => (
                        <option key={member.id} value={member.id}></option>
                        ))}
                        </Td1>
                        <Td2>
                            <input type="button" value="추가 >>" onClick={moveR} /><br></br>
                            <input type="button" value="<< 제거" onClick={moveL} /><br></br>
                        </Td2>
                        <Td3>
                            <select name="selectedMemberList" size="30">
                                
                            </select>
                        </Td3>
                    </tr>
                </MemberListTable>
                <ButtonStyle>
                <button type="button" onClick={Complete}>완료</button>
                <button type="button" onClick={Cancel}>취소</button>
                </ButtonStyle>
        </Container>
    )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const H1 = styled.h1`
    font-size: 30px;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

const MemberListTable = styled.table`
    justify-content: center;
    border: solid 1px;
`;

const Td1 = styled.td`
    
`;

const Td2 = styled.td`
    align-items: center;
    vertical-align: middle;
`;

const Td3 = styled.td`

`;

const ButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        border: solid 1px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: gray;
        color: white;
        border: none;
        cursor: pointer;
        margin: 1px;
    }

`;