import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import AttenCalendar from "@/components/calendar/AttenCalendar";

// 관리자 부서별 근태 통계(상세)
const AdminAttenAnnualDetail = () => {
    // 테두리 스타일을 정의합니다.
    
    return (
        <div>
            <div>
            <TblComponent>
                <PayTableBottom>
                    <tbody>
                        <tr>
                            <th>사번</th>
                            <th>이름</th>
                            <th>지각계</th>
                            <button>정렬</button>
                        </tr>

                        <tr>
                            <td>null%</td>
                            <td>null%</td>
                            <td>null%</td>
                        </tr>
                        </tbody>
                </PayTableBottom>
            </TblComponent>
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{ border: "3px solid black", borderRadius: "20px", width: "600px", height: "665px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AttenCalendar />
            </div>
        </div>


    );
}

export default AdminAttenAnnualDetail;

AdminAttenAnnualDetail.getLayout = function getLayout(page) {
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