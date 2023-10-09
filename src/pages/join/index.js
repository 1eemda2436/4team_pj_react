import styled from "styled-components"
import ArrowL from '../../../public/asset/icons/arrowLeft.svg'
import { useRouter } from "next/navigation";

export default function Join() {
    const router = useRouter();

    // const step = [
    //     {page: "step1", component: }
    // ]

    return(
        <MainComponent>
            <Component>
                <Header>
                    <ArrowL onClick={() => router.back()} />
                    <StepBox>
                        1 / 3
                    </StepBox>
                </Header>

                <NextBtn>다음</NextBtn>
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