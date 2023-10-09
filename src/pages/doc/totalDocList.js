import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";



const Doc = () => {

    const ApprovalList = () => {

    }

    const CircularList = () => {

    }

    const TemporarySave = () => {

    }

    const ApprovalEnd = () => {

    }

    const ApprovalIng = () => {

    }

    const ApprovalBack = () => {
        
    }

    return(
        <Container>
            <Title>
                <H1>통합 문서함</H1>
            </Title>
            <PersonalMenu>
                <tr>
                    <td>
                        <input type="button" onClick={ApprovalList}>기안 문서함</input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onClick={CircularList}>회람 문서함</input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onClick={TemporarySave}>임시 저장목록</input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onClick={ApprovalEnd}>결재 완료 문서함</input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onClick={ApprovalIng}>결재 예정 문서함</input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="button" onClick={ApprovalBack}>결재 반려 문서함</input>
                    </td>
                </tr>
            </PersonalMenu>
            
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

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const H1 = styled.h1`
    font-size: 30px;
`;

const PersonalMenu = styled.div`

`;