import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";



const Doc = () => {

    const ApprovalList = () => {
        console.log('기안문서함클릭')
    }

    const CircularList = () => {
        console.log('회람문서함클릭')
    }

    const TemporarySave = () => {
        console.log('임시저장함클릭')
    }

    return(
        <Container>
            <Title>
                <H1>통합 문서함</H1>
            </Title>
            <PersonalMenu>
                <tr>
                    <td>개인문서함</td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={ApprovalList}>기안 문서함</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={CircularList}>회람 문서함</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={TemporarySave}>임시 저장목록</button>
                    </td>
                </tr>
            </PersonalMenu>
            <DocList>
                <tr>
                    <td>
                        이곳에 ajax를 사용해서 각 문서함 리스트 출력
                    </td>
                </tr>
            </DocList>
            
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
    width: 200px;
    padding: 20px;
    position: fixed;
    height: 100%;
    left: auto;
    top: auto;
`;

const DocList = styled.div`
    margin-left: 220px;
    padding: 20px;
`;