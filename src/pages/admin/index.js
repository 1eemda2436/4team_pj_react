import AdminLayout from "@/components/layout/adminLayout"

const Guest = () => {
    return(
        <div>
            admin test
        </div>
    )
};

export default Guest;

/**
 * 컴포넌트명.getLayout 으로 _app.js에 있는 함수 선언
 * 리턴 값에 사용할 레이아웃 태그 선언 후 매개변수로 받은 page값 선언해서 사용
 */
Guest.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};