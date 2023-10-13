import axios from 'axios';

const BASE_URL = "http://localhost:8081";

class Apiservice {
    // total
    totalList() {
        console.log('totalList() 호출');
        return axios.get(BASE_URL + '/' + total);
    }

    // draft
    draftList() {
        console.log('draftList() 호출');
        return axios.get(BASE_URL + '/' + draft)
    }
}

export default new Apiservice();