import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";

// 관리자 부서별 근태 현황(상세)
const AdminAttenDepDetail = () => {
    // 테두리 스타일을 정의합니다.

    const router = useRouter();

    return (
        <div align="center">
            <div>
            <TblComponent>
                <PayTableBottom>
                    <tbody>
                        <tr>
                            <th colSpan={2} onClick={() => router.push('/admin/attendance/adminAttenAnnualDetail')} style={{ cursor: 'pointer' }}>부서별 근태 현황</th>
                        </tr>

                        <tr>
                            <th colSpan={2}><hr/></th>
                        </tr>

                        <tr>
                            <th>금일 출근률</th>
                            <td>null%</td>
                        </tr>

                        <tr>
                            <th>금일 지각률</th>
                            <td>null%</td>
                        </tr>

                        <tr>
                            <th>금일 연차률</th>
                            <td>null%</td>
                        </tr>
                    </tbody>
                </PayTableBottom>
            </TblComponent>
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{border: "3px solid black", borderRadius: "20px", height: "80px", textAlign: "center", width: "800px"}}>
                <span style={{ lineHeight: "80px" }}>
                    캘린더자리
                </span>
            </div>
            <br/><br/><hr/><br/><br/>
            <TblComponent>
                <PayTableBottom>
                    <tr>
                        <th>지각자 수</th>
                        <th>지각자 통계</th>
                        <th>연차 및 휴가 자</th>
                        <th>연차 및 휴가 자 통계</th>
                    </tr>

                    <tr>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                        <td>null</td>
                    </tr>
                </PayTableBottom>
            </TblComponent>
        </div>


    );
}

export default AdminAttenDepDetail;

AdminAttenDepDetail.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};


const TblComponent = styled.div`
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    margin-top: 40px;
    width: 800px;
`;

const TblHeader = styled.div`
    padding: 0px 15px;
    background: #F6F8FA;
    border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
    height: 550px;
    overflow-x: auto;
    padding: 0px 15px;

&::-webkit-scrollbar {
    width: 4px;
} 

&::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}

&::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
`;

const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Table = styled.table`
    width:100%;
    table-layout: fixed;
    font-size: .9em;
    width: 800px;
    min-width: 650px;
    border-collapse: collapse;

    th {
    width: 150px;
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
    }

    td {
    padding: 15px;
    vertical-align: middle;
    font-size: 13px;
    border-bottom: solid 1px #E5E5E5;
    text-align: center;
    word-wrap: break-word;
    }
`;

const PayTableTop = styled(Table)``;

const PayTableBottom = styled(Table)`
    margin-top: 20px;
`;