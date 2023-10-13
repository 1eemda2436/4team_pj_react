import AdminLayout from "@/components/layout/adminLayout";
import ApiService from "./ApiService";
import { Component } from "react";

class ListAdminComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendance: [],
            message: null
        }
    }

    // list정보
    adminAnnualList = () => {
        ApiService.annualRequestsList()
            .then(res => {
                this.setState({
                    attendance: res.data
                })
            })
            .catch(err => {
                console.log('adminAnnualList Error', err);
            });
    }
}   

// 연차 신청 목록[관리자]
const AdminAnnualList = () => {

    return (
        <div>
            <h1>연차 신청 내역</h1>
            <br/><br/><hr/><br/><br/>
            <table>
                <thead>
                    <tr>
                        <th>문서번호</th>
                        <th>문서 제목</th>
                        <th>승인여부</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.attendance.map((annual, index) => (
                        <tr key={index}>
                            <td>{annual.annual_id}</td>
                            <td>{annual.annual_title}</td>
                            <td>{annual.confirm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAnnualList;

AdminAnnualList.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
