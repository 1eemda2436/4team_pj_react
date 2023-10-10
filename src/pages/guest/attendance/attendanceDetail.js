import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";

// 내 근태 현황(상세)
const AttendanceDetail = () => {
    return (
        <div>
            {/* 적용한 스타일을 가진 테이블 사용 */}
            <StyledTable>
                <tr>
                    <ColspanCell colSpan="2">나의 근태 현황</ColspanCell>
                </tr>

                <tr>
                    <StyledTableCell>사원번호</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>부서번호</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>부서명</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>성명</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>금일 출근시간</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>금일 퇴근시간</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>금일 추가근무 시간</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>

                <tr>
                    <StyledTableCell>총 근무 시간</StyledTableCell>
                    <StyledTableCell>null</StyledTableCell>
                </tr>
            </StyledTable>

            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>

            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>
            <br />
            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>
            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>
            <br />
            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>
            <AnnualRest>
                [ 총 연차 합계 ]
            </AnnualRest>

            <div>
                <table border={(3)} align="center">
                    <tr>
                        <th>지각 시간</th>
                        <th>지각 횟수</th>
                        <th>결근 시간</th>
                        <th>휴가 기간</th>
                        <th>휴가 사유</th>
                    </tr>

                    <tr>
                        <th>null</th>
                        <th>null</th>
                        <th>null</th>
                        <th>null</th>
                        <th>null</th>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default AttendanceDetail;

AttendanceDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

// 스타일을 적용할 테이블 컴포넌트 생성
const StyledTable = styled.table`
    width: 100%; /* 테이블 너비 100%로 설정 */
    text-align: center; /* 텍스트 가운데 정렬 */
`;

// 각 셀에 테두리 추가
const StyledTableCell = styled.td`
    border: 1px solid black; /* 각 셀의 테두리 설정 */
    padding: 8px; /* 셀 안의 여백 설정 */
`;

const ColspanCell = styled(StyledTableCell)`
    colspan: 2;
`;

const AnnualRest = styled.div`
    border: 3px solid black;
    border-radius: 20px;
    width: 20%;
    background-color: #17a1fa;
    height: 103px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-right: 10px;
`;