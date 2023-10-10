import MainLayout from "@/components/layout/mainLayout";

// 연차 신청
const VacationRegister = () => {
    return (
        <div>
            <div>
                [ 캘린더 자리 ]
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table>
                    <tr>
                        <th colSpan="2">휴가 신청서</th>
                    </tr>

                    <tr>
                        <td>
                            <div>
                                <label htmlFor="title">제목</label>
                                <input type="text" id="title" placeholder="제목입력~" />
                            </div>
                        </td>
                        <td>
                            <div>
                                <label htmlFor="reference">참조</label>
                                <input type="text" id="reference" placeholder="참조 입력~" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <div>
                                <label htmlFor="content">내용</label>
                                <input type="text" id="content" placeholder="내용 입력~" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <div>
                                <label htmlFor="file">파일 추가</label>
                                <input type="file" id="file" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <div>
                                <label htmlFor="referenceList">참조자 및 참조 부서 목록</label>
                                <input type="text" id="referenceList" placeholder="참조자 입력~" />
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            <input type="button" value={"신청하기"} />
                        </td>
                    </tr>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <div>휴가 상세 내역</div>
                <br/>
                <div>[ 총 휴가 ]</div>
                <div>[ 사용한 휴가 ]</div>
                <div>[ 남은 휴가 ]</div>
                <div>[ 그 동안 사용한 휴가의 승인 여부 ]</div>
                <div>[ 그 동안 거절된 휴가의 사유 ]</div>
            </div>
        </div>
    );
}

export default VacationRegister;

VacationRegister.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
