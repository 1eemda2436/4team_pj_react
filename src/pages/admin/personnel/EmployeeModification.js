import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';



const EmployeeModification = () => {
    const router = useRouter();
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
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
             
            <button onClick={() => router.push('/admin/personnel')}></button>

        </div>
      );
}

export default EmployeeModification;

EmployeeModification.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

