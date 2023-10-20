import styled from "styled-components"
import ArrowL from '../../../public/asset/icons/arrowLeft.svg'
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/form/input";

export default function Join() {
    const token = localStorage.getItem('token')
    const router = useRouter();
    const [step, setStep] = useState(1);

    const [status, setStatus] = useState({
        name: '',
        address: '',
        employees: '',
        manager: '',
        email: '',
        work_in: '',
        work_out: '',
    });

    const [joinData, setJoinData] = useState({
        name: '',
        address: '',
        employees: '',
        manager: '',
        email: '',
        work_in: '',
        work_out: '',
        KEY: '',
    })

    const prevJoinData = useRef(joinData);

    useEffect(() => {
        prevJoinData.current = joinData;
    }, [joinData]);

    //    company_id   varchar2(50)   	PRIMARY KEY,   	--회사 id
//    name      	varchar2(100)   NOT NULL,      	--회사명
//    address      varchar2(255)   NOT NULL,      	--주소
//    employees   	NUMBER         	NOT NULL,      	--직원 수
//    manager      varchar2(50)   	NOT NULL,      	--담당자명
//    email      	varchar2(100)   NOT NULL,      	--담당자 이메일
//    work_in		TIMESTAMP		NOT NULL,		--회사 근무내규 _ 출근시간
//    work_out		TIMESTAMP		NOT NULL,		--회사 근무내규 _ 퇴근시간
//    KEY         	varchar2(100)   NOT NULL,      	--이메일 인증 키
//    enabled      char(1)         

    const handleInputChange = (name, value) => {
        setJoinData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }
    
    const handleNextStep = () => {
        if (step < 3) {
            // 다음 단계 이동
            setStep(step + 1);
        }
    };

    function Step1Content() {
        return (
            <StepMainComponent>
                <TitleBox>
                    <><ColorTitle>사업자 정보 확인</ColorTitle>을 위해</>
                    <>아래 내용들을 입력해주세요 📝</>
                </TitleBox>
                <InputForm>
                    <Input
                        type='text'
                        label="회사명"
                        name="name"
                        value={prevJoinData.current.name}
                        onChange={handleInputChange}
                        isStatus={status.name}
                    />
                    
                </InputForm>
            </StepMainComponent>
        );
    
    }
    
    function Step2Content() {
        return <div>Step 2 내용</div>;
    }
    
    function Step3Content() {
        return <div>Step 3 내용</div>;
    }
    
    return(
        <MainComponent>
            <Component>
                <Header>
                    <ArrowL onClick={() => router.back()} />
                    <StepBox>
                        {step} / 3
                    </StepBox>
                </Header>

                <JoinContent>
                    {step === 1 && <Step1Content />}
                    {step === 2 && <Step2Content />}
                    {step === 3 && <Step3Content />}
                </JoinContent>

                {/* 마지막 단계에서 버튼 안보이게 */}
                {step < 3 && (
                    <NextBtn onClick={handleNextStep}>다음</NextBtn>
                )}
            </Component>
        </MainComponent>
    )
}


//    company_id   varchar2(50)   	PRIMARY KEY,   	--회사 id
//    name      	varchar2(100)   NOT NULL,      	--회사명
//    address      varchar2(255)   NOT NULL,      	--주소
//    employees   	NUMBER         	NOT NULL,      	--직원 수
//    manager      varchar2(50)   	NOT NULL,      	--담당자명
//    email      	varchar2(100)   NOT NULL,      	--담당자 이메일
//    work_in		TIMESTAMP		NOT NULL,		--회사 근무내규 _ 출근시간
//    work_out		TIMESTAMP		NOT NULL,		--회사 근무내규 _ 퇴근시간
//    KEY         	varchar2(100)   NOT NULL,      	--이메일 인증 키
//    authoriry   	varchar2(30)   	NOT NULL,      	--권한
//    enabled      char(1)         

const MainComponent = styled.div`
    width: 100%;
    height: 100vh;
    background: #EEE;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Component = styled.div`
    width: 600px;
    height: 100%;
    box-sizing: border-box;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 0px 25px;
`;

const Header = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StepBox = styled.div`
    width: 50px;
    border-radius: 30px;
    background: #007BFF;
    color: #FFF;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 3px;
`;

const JoinContent = styled.div``;

const NextBtn = styled.div`
    width: 600px;
    height: 70px;
    border-radius: 8px 8px 0px 0px;
    background: #DEDEDE;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 800;
    color: white;
    cursor: pointer;
`
const StepMainComponent = styled.div``;

const TitleBox = styled.div``;

const ColorTitle = styled.div``;

const InputForm = styled.div``;