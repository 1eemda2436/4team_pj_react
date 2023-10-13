import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from "next/router";



const Doc = () => {

    const router = useRouter();

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
                        <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</button>
                    </td>
                </tr>
            </PersonalMenu>
            <DocList>
                <tr>
                    <td>
                        버튼을 누르면 페이지가 넘어가지 않고 여기에 뜨게 만들기
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
    top: 100px;
`;

const DocList = styled.div`
    margin-left: 220px;
    padding: 20px;
`;