import styled from "styled-components"
import ArrowL from '../../../public/asset/icons/arrowLeft.svg'

export default function Join() {
    return(
        <MainComponent>
            <Component>
                <Header>
                    <ArrowL />
                    <StapBox>
                        1 / 3
                    </StapBox>
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
    width: 550px;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 25px;
`;

const Header = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #D9D9D9;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StapBox = styled.div`
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
    transform: translate(-50%, -50%);
    bottom: 0;
`