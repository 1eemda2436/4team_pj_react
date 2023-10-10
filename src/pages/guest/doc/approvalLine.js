import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";



const Doc = () => {

    const moveR = () => {

    }

    const moveL = () => {

    }

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
                            <select name="memberList" size="30">
                                <option value="사원1">사원1</option>
                                <option value="사원2">사원2</option>
                                <option value="사원3">사원3</option>
                                <option value="사원4">사원4</option>
                                <option value="사원5">사원5</option>
                            </select>
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