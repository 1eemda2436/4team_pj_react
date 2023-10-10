import MainLayout from "@/components/layout/mainLayout"
import ChattingMain from "./ChattingMain";

const Chatting = () => {
    return (
        <div>
            <ChattingMain/>
        </div>
    )

}

export default Chatting;

Chatting.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};