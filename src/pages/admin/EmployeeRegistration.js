import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const EmployeeRegistration = () => {
  return (
    <div>
        <h2>인사 관리 - 사원 등록</h2>

        <div>
            <div>사원코드</div>
            <div>1</div>
            <div>사원명</div>
            <div>FORBIDDEN</div>
            <div>전화번호</div>
            <div>010-5159-6523</div>
        </div> 

        <div>
            <button>등록</button> 
        </div>
        
    </div>
  );
} 

export default EmployeeRegistration;

EmployeeRegistration.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};