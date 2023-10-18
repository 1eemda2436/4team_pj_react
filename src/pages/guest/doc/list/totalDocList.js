import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8081/doc/guestTotal")
        .then((response) => {
            setSamples(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return(
        <Container>
            <Title>
                <H1>통합 문서함</H1>
            </Title>
            <PersonalMenu>
                <tbody>
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
                </tbody>
            </PersonalMenu>
            <DocList>
                <tbody>
                    <tr>
                        <td>
                            버튼을 누르면 페이지가 넘어가지 않고 여기에 뜨게 만들기
                        </td>
                    </tr>
                </tbody>
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
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PersonalMenu = styled.table`
  margin-bottom: 20px;
  td {
    padding: 10px;
    button {
      background-color: gray;
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 16px;
    }
  }
`;

const DocList = styled.table`
  td {
    padding: 10px;
    border: 1px solid black;
  }
`;

const H1 = styled.h1`
  font-size: 30px;
`;