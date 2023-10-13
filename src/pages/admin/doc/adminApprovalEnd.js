import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";



const Doc = () => {

    const router = useRouter();

    return(
        <Container>
            <Title>
                <H1>완료 문서함</H1>
            </Title>
            <Docstyle1>
                <Table>
                    <TableTr>
                        <TableTh>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalEnd')}>결재 완료 문서함</button>
                        </TableTh>
                        <TableTh>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 예정 문서함</button>
                        </TableTh>
                        <TableTh>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalBack')}>결재 반려 문서함</button>
                        </TableTh>
                    </TableTr>
                </Table>
            </Docstyle1>

            <Docstyle2>
                <Table>
                    <thead>
                        <TableTr>
                            <TableTh2>상태</TableTh2>
                            <TableTh2>문서번호</TableTh2>
                            <TableTh2>카테고리</TableTh2>
                            <TableTh2 isTitle>문서 제목</TableTh2>
                            <TableTh2>작성자</TableTh2>
                            <TableTh2>기안일</TableTh2>
                        </TableTr>
                    </thead>
                    <tbody>
                        <TableTr>
                                <TableTd2>1</TableTd2>
                                <TableTd2>1</TableTd2>
                                <TableTd2>1</TableTd2>
                                <TableTd2 isTitle>1</TableTd2>
                                <TableTd2>1</TableTd2>
                                <TableTd2>1</TableTd2>
                        </TableTr>
                    </tbody>
                </Table>
            </Docstyle2>
        </Container>
    )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
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

const Docstyle1 = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px;
`;

const Docstyle2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const H1 = styled.h1`
    font-size: 30px;
`;

const Table = styled.table`
    border: 1px solid;
`;

const TableTr = styled.tr`
    border: 1px solid;
`;

const TableTh = styled.th`
    border: 1px solid;
    padding: 5px;
`;

const TableTh2 = styled.th`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: ${(props) => (props.isTitle ? '40%' : 'auto%')};
    width: 100px;
`;

const TableTd = styled.td`
    border: 1px solid;
`;

const TableTd2 = styled.td`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: ${(props) => (props.isTitle ? '40%' : 'auto%')};
`;