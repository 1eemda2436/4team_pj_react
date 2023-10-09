import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const PayManagement = () => {
  return (
    <div>
        <h2>급여관리</h2>
        <table>
          <tr>
            <th>순번</th>
            <th>사번</th>
            <th>이름</th>
            <th>주민번호</th>
            <th>근무유형</th>
            <th>소속</th>
            <th>직윈</th>
            <th>직무</th>
            <th>재직여부</th>
            <th>월급</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td colSpan={9}>합계</td>
            <td>합</td>
          </tr>
        </table>
    </div>
  );
}

export default PayManagement;

PayManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};