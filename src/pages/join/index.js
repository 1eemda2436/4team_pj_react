import styled from "styled-components"
import ArrowL from '../../../public/asset/icons/arrowLeft.svg'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/form/input";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from "axios";
import {BASE_URL} from "@/api/apiPath";

const steps = [
    {
        title: "사업자 정보 확인",
        subTitle: "을 위해",
        fields: [
            {
                type: "text",
                name: "name",
                label: "회사명",
                placeholder: "회사명을 입력해주세요",
            },
            {
                type: "text",
                name: "address",
                label: "회사 주소",
                placeholder: "회사 주소를 입력해주세요",
            },
            {
                type: "number",
                name: "employees",
                label: "회사 규모",
                placeholder: "회사 규모를 입력해주세요",
            },
        ],
    },
    {
        title: "그룹웨어 담당자",
        subTitle: "의 정보 확인을 위해",
        fields: [
            {
                type: "text",
                name: "manager",
                label: "담당자명",
                placeholder: "담당자명을 입력해주세요",
            },
            {
                type: "text",
                name: "email",
                label: "E-mail",
                placeholder: "담당자 이메일을 입력해주세요",
            },
            {
                type: "datetime-local",
                name: "work_in",
                label: "사내 출근 내규",
                placeholder: "사내 출근 내규를 입력해주세요",
            },
            {
                type: "datetime-local",
                name: "work_out",
                label: "사내 퇴근 내규",
                placeholder: "사내 퇴근 내규를 입력해주세요",
            },
        ],
    },
    {
        title: "그룹웨어 어드민 로그인",
        subTitle: "을 위해",
        fields: [
            {
                type: "password",
                name: "pwd",
                label: "비밀번호",
                placeholder: "비밀번호를 입력해주세요",
            },
            {
                type: "password",
                name: "pwd_re",
                label: "비밀번호 확인",
                placeholder: "비밀번호를 확인해주세요",
            },
        ],
    },
];

export default function Join() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        employees: '',
        manager: '',
        email: '',
        work_in: '',
        work_out: '',
        pwd: '',
        pwd_re: '',
    });

    const [user_id, setUser_id] = useState('');

    const arePasswordsMatching = (pwd) => {
        return pwd.pwd === pwd.pwd_re;
    };
    
    const handleChange = (name, value) => {
        let updatedFormData = { ...formData };
        updatedFormData[name] = value;
    
        const requiredFieldsMap = {
            0: ["name", "address", "employees"],
            1: ["manager", "email", "work_in", "work_out"],
            2: ["pwd", "pwd_re"],
        };
    
        const requiredFields = requiredFieldsMap[step] || [];
        const isAllFieldsValid = requiredFields.every((field) => {
            return updatedFormData[field] !== '';
        });
    
        const isPasswordMatching = step === 2 ? arePasswordsMatching(updatedFormData) : true;
    
        setFormData(updatedFormData);
    
        if (isAllFieldsValid && isPasswordMatching) {
            setIsSuccess(true);
        }
    };
    

    
    const handleNextStep = () => {
        if(isSuccess) {
            if (step === steps.length -1) {

                const JoinData = {
                    'companyDTO': {
                        name: formData.name,
                        address: formData.address,
                        employees: formData.employees,
                        manager: formData.manager,
                        email: formData.email,
                        work_in: formData.work_in,
                        work_out: formData.work_out,
                        key: '임시 키',
                        enabled: 'Y'
                    },
                    'memberDTO': {
                        pwd: formData.pwd,
                    }
                };

                console.log(JoinData)

                axios.post(`${BASE_URL}/join`, JoinData)
                    .then((response) => {
                        console.log(response);
                        alert('회원가입이 완료되었습니다.')
                        setUser_id(response.data.memberDTO.id)
                        setStep(step + 1);
                        
                    })
                    .catch((error) => {
                        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                        console.log(error);
                });
            } else {
                setStep(step + 1);
                setIsSuccess(false)
            }
        } else {
            alert("올바른 값을 입력해주세요.");
        }
    };
    
    return(
        <MainComponent>
            <Component>
                <Header>
                    <ArrowL onClick={() => router.back()} />
                    <StepBox>
                        {step + 1} / 3
                    </StepBox>
                </Header>

                <TitleBox>
                    <TitleTop>
                        <ColorTitle>{steps[step] ? steps[step].title : '환영합니다'}</ColorTitle>
                        <div>{steps[step] ? steps[step].subTitle : ''}</div>
                    </TitleTop>
                    <div>{steps[step] ? '아래 정보를 입력해주세요. 📂' : '회원가입이 완료되었습니다.'}</div>
                </TitleBox>

                {step !== steps.length ? (
                    <InputContainer>
                        {steps[step].fields.map((field) => (
                            <Input
                                key={field.name}
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || ""}
                                label={field.label}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                            />
                        ))}
                    </InputContainer>
                ) : (
                    <>
                        <DoneAllIconStyle />
                        <Span onClick={() => {router.push('/')}}>
                            회원 님의 id는 {user_id}번 입니다. <br />
                            로그인 페이지로 이동
                        </Span>
                    </>
                )}

                {step !== steps.length && (
                    <NextBtn onClick={handleNextStep} isSuccess={isSuccess}>
                        {step === 2 ? '회원가입' : '다음'}
                    </NextBtn>
                )}
            </Component>
        </MainComponent>
    )
}

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

const NextBtn = styled.div`
    width: 600px;
    height: 70px;
    border-radius: 8px 8px 0px 0px;
    background: ${props => (props.isSuccess ? '#007BFF' : '#DEDEDE')};
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

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 26px;
    margin-top: 35px;
`;

const TitleTop = styled.div`
    display: flex;
    font-size: 28px;
    margin-bottom: 8px;
`;

const ColorTitle = styled.div`
    color: #007BFF;
    font-weight: 800;
    display: flex;
`;

const InputContainer = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    box-sizing: border-box;

    & > * {
    margin-bottom: 40px;
    }

    & > *:last-child {
        margin-bottom: 0;
    }

`;

const DoneAllIconStyle = styled(DoneAllIcon)`
    width: 400px !important;
    height: auto !important;
    color: #eee;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Span = styled.div`
    width: 100%;
    color: #007BFF;
    text-align: center;
    text-decoration: underline;
    margin-top: 100%;
    cursor: pointer;

    &:hover{
        color: red;
    }
`;