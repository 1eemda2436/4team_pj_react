import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

const Input = ({ type, label, name, onChange, placeholder, value }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    }

    const handleBlur = () => {
        setFocused(false);
    }

    const handleChange = useCallback((e) => {
        onChange(name, e.target.value);
    }, [name, onChange]);

    return (
        <InputComponent>
            <Label focused={focused}>{label}</Label>
            <InputForm
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </InputComponent>
    );
}

Input.defaultProps = {
    onChangeInput: undefined,
    placeholder: undefined,
    isStatus: undefined
}

export default Input;


// 다음과 같이 사용
/*
<Input
    type="text"
    label="인풋이름"
    name="name"
    value={nameValue}
    isStatus={success, fail = 성공 혹은 실패 여부}
    onChange={handleNameChange}
    placeholder="이름을 입력하세요"
/>
*/

const InputComponent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const Label = styled.div`
    color: ${({ focused }) => (focused ? "#005FC5" : "#000")};
    font-weight: 600;
    transition: color 0.1s;
    margin-bottom: 5px;
    padding: 0px 5px;
    box-sizing: border-box;
`;

const InputForm = styled.input`
    padding: 15px 10px;
    border: 1px solid #A6A6A6;
    border-radius: 5px;
    outline: none;
    font-size: 16px;

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        appearance: none;
    }

    ${({ focused }) => {
        if (focused) {
            return `
                border: 1px solid #005FC5;
                transition: 0.5s;
            `;
        }
    }}
`;