import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const PayStatement = () => {
  return (
    <div>
        <h2>급여관리 - 명세서</h2>
        
        <div>직책</div>
        <div>이름</div>

        <div>2023년 10월 명세서</div>
        <div>
            <div>지급일자</div>
            <div>이메일</div>
            <div>직책/이름</div>
        </div>
        <table>
            <tr>
                <td colSpan={4}>지급내역(과세)</td>
                <td colSpan={2}>지급내역(비과세)</td>
                <td rowSpan={2}>지급액</td>
                <td rowSpan={7}>지급총액</td>
            </tr>
            <tr>
                <td>기본금</td>
                <td>상여금</td>
                <td>야근수당</td>
                <td>연차수당</td>
                <td>식비</td>
                <td>교통비</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td colSpan={6}>공제내역</td>
                <td rowSpan={2}>공제계</td>
            </tr>
            <tr>
                <td>소득세</td>
                <td>지방 소득세</td>
                <td>국민연금</td>
                <td>건강보험</td>
                <td>장기 요양보험</td>
                <td>고용보험</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td colSpan={7}>합 계</td>
                <td></td>
            </tr>
        </table>
        <button>발송</button>
    </div>
  );
}

export default PayStatement;

PayStatement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};