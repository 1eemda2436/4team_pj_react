import AdminLayout from "@/components/layout/adminLayout";

const AdminDoc = () => {

}

export default AdminDoc;

AdminDoc.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};