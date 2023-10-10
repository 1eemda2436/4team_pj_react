import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const DepartmentManagement = () => {
  return (
    <div>
        <h2>인사 관리 - 부서 관리</h2>

        <div>
            <div>부서코드</div>
            <div>1</div>
            <div>부서명</div>
            <div>FORBIDDEN</div>
            <div>팀 코드</div>
            <div>1</div>
            <div>팀명</div>
            <div>FORBIDDEN TEAM</div>
        </div>

        <div>
            <button>수정</button> 
            <button>등록</button> 
        </div>
        
    </div>
  );
} 


export default DepartmentManagement;

DepartmentManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};