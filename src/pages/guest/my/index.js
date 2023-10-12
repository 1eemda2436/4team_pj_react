import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout";

const MyPage = () => {

}

export default MyPage;

MyPage.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
