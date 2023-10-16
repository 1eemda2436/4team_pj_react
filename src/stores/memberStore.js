import { ConstructionOutlined } from '@mui/icons-material';
import { makeAutoObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react';

enableStaticRendering(typeof window === 'undefined');

export class MemberStore {
    member = {
        id: null,
        company_id: null, // 회사 id
        pwd: null, // 사원 비밀번호
        name: null, // 사원 이름
        email: null, // 사원 이메일
        tel: null, // 사원 전화번호
        profile: null, // 프로필 사진
        hireday: null, // 입사일
        resignation: null, // 퇴사일
        birthday: null, // 생일
        resident: null, // 주민 번호
        depart_id: null, // 부서 id(소속)
        team_id: null, // 팀 id (Nullable)
        rank: null, // 직급
        salary: null, // 연봉
        bank: null, // 계좌
        contract: null, // 계약 형태(유형)
        sign: null, // 사원 사인 이미지
        state: null, // 사원 업무상태 (1-업무중 / 2-외출 / 3-비활성화)
        e_state: null, // 재직여부(1-재직, 0-퇴사)
        key: null, // 문자인증 키
        authority: null, // 권한
        enabled: null // 인증여부 (Y/N)
    };
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setMemberData(data) {
        this.member = data;

        console.log(this.member)
    }
}

const memberStore = new MemberStore();

export default memberStore;
