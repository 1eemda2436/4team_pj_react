const { Component } = require("react")

const Chatting = () => {
    return (
        <Component>
            {/* 수신div */}
            <div>
                <div>보낸사람</div>
                <div>보낸내용</div>
                <div>보낸시간</div>
                <div>확인여부</div>
            </div>
            {/* 발신div */}
            <div>
                <div>보낸사람</div>
                <div>보낸내용</div>
                <div>보낸시간</div>
                <div>확인여부</div>
            </div>
            <div>텍스트 입력</div>
        </Component>
    )
}