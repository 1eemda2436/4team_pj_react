import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/router";
import styled from "styled-components";

// 내 근태 현황(상세)
const AttendanceDetail = () => {

    const router = useRouter();

    return (
        <div align="center">
            <Title>나의 근태 현황</Title>
            <div>

            <TblComponent>
                <PayTableBottom>
                    <tbody>
                    <tr>
                        <th style={{width: "150px"}}>사원번호</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>부서번호</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>부서 명</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>성명</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>금일 출근시간</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>금일 퇴근시간</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>금일 추가근무시간</th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>총 근무시간</th>
                        <td>null</td>
                    </tr>
                        
                    </tbody>
                </PayTableBottom>
            </TblComponent>

            </div>

            <div align="center" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "10px" }}>

                <AnnualRequest onClick={() => router.push('/guest/attendance/register/annualRegister')} style={{ cursor: 'pointer' }}>
                    [ 연차 신청 ]
                </AnnualRequest>

                <AnnualRequest onClick={() => router.push('/guest/attendance/register/vacationRegister')} style={{ cursor: 'pointer' }}>
                    [ 휴가 신청 ]
                </AnnualRequest>

                <AnnualRest>
                    [ 총 연차 합계 ]
                </AnnualRest>

                <AnnualRest>
                    [ 15 ]
                </AnnualRest>

                <AnnualRest>
                    [ 사용한 연차]
                </AnnualRest>

                <AnnualRest>
                    [ 3 ]
                </AnnualRest>

                <AnnualRest>
                    [ 미사용 연차 ]
                </AnnualRest>

                <AnnualRest>
                    [ 12 ]
                </AnnualRest>

                <AnnualRest>
                    [ 연차 목록 ]
                </AnnualRest>

                <AnnualRest onClick={() => router.push('/guest/attendance/annual')} style={{ cursor: 'pointer' }}>
                    [ 2 ]
                </AnnualRest>

            </div>

            <div>
                <TblComponent>
                    <TblHeader>
                        <PayTableTop>
                            <thead>
                            <tr>
                                <th>지각 시간</th>
                                <th>지각 횟수</th>
                                <th>결근 시간</th>
                                <th>휴가 기간</th>
                                <th>휴가 사유</th>
                            </tr>
                            </thead>
                        </PayTableTop>
                    </TblHeader>

                    <TblContent>
                        <PayTableBottom>
                            <tbody>
                            <tr>
                                <td>null</td>
                                <td>null</td>
                                <td>null</td>
                                <td>null</td>
                                <td>null</td>
                            </tr>
                            </tbody>
                        </PayTableBottom>
                    </TblContent>
                </TblComponent>
            </div>
        </div>
    );
}

export default AttendanceDetail;

AttendanceDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Title = styled.div`
    padding: 40px;
    font-size: 26px;
    font-weight: 700;
    color: #007bff;
`;

const TblComponent = styled.div`
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    margin-top: 40px;
    width: 800px;
`;

const TblHeader = styled.div`
    padding: px 15px;
    background: #F6F8FA;
    border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
    height: 550px;
    overflow-x: auto;
    padding: px 15px;

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

const Table = styled.table`
    width:100%;
    table-layout: fixed;
    font-size: .9em;
    width: 800px;
    min-width: 650px;
    border-collapse: collapse;

    th {
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

const TotalBox = styled.div`
    display: flex;
    margin: 50px 30px 20px 30px;
    justify-content: flex-end;
    align-items: flex-end;
    box-sizing: border-box;
`;

const TotalTitle = styled.div`
    color: #007bff;
    font-weight: 700;
    font-size: 20px;
`;

const TotalResult = styled.span`
    margin-left: 15px;
`;

const AnnualRest = styled.div`
    border: 3px solid black;
    border-radius: 20px;
    width: 300px;
    background-color: #17a1fa;
    height: 100px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-right: -35%;
    margin-left: 35%;
`;

const AnnualRequest = styled.div`
    border: 3px solid black;
    border-radius: 20px;
    width: 300px;
    background-color: #9AFBA9;
    height: 100px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    //margin-right: 10px;
    margin-left: 35%;
    margin-top: 30px;
    margin-right: -35%;
`;