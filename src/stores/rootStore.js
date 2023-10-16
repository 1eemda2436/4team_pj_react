import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import { MemberStore } from './memberStore';


// NextJS 특정, 서버 측 렌더링하지 않음
enableStaticRendering(typeof window === 'undefined')

export class RootStore {
	MemberStore;
    isLogin = false; // 로그인 여부
    token = null; // 토큰값

    constructor() {
        this.MemberStore = new MemberStore(this);

        makeAutoObservable(this);
    }

    login(token) {
        this.isLogin = true;
        this.token = token;

        console.log(this.isLogin, this.token)
    }

    logout() {
        this.isLogin = false;
        this.token = null;
    }
}

const rootStore = new RootStore();

export default rootStore;