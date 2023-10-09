import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const EmployeeManagement = () => {
  return (
    <div>
        <h2>인사 관리 - 사원 관리</h2>

        <table>
            <tr>
                <th>순번</th>
                <th>부서</th>
                <th>팀</th>
                <th>사번</th>
                <th>이름</th>
                <th>전화번호</th>
                <th colSpan={2}>수정 / 삭제</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><button>수정</button></td>
                <td><button>삭제</button></td>
            </tr>
        </table>
         
    </div>
  );
} 

export default EmployeeManagement;

EmployeeManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};