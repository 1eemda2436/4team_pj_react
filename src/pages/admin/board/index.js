import AdminLayout from "@/components/layout/adminLayout";


const Notice = () => {

}

export default Notice;

Notice.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};