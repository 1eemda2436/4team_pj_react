import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";

const SecurityManagement = () => {
  return (
    <div>
        <h2>권한관리</h2>

        <div>직책</div>
        <div>이름</div> 

        <div>보안관리</div>
        <div>근태관리</div>
        <div>급여관리</div>
        <div>전자결재관리</div>
        <div>인사관리</div>
        <div>게시판관리</div>

        <button>권한부여</button>
    </div>
  );
}

export default SecurityManagement;

SecurityManagement.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};