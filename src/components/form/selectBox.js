import styled from "styled-components";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";

const SelectBox = ({ label, itemData, onItemSelected  }) => {
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState({
        id: null,
        name: ''
    });

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const handleSelect = (selectValue) => {
        console.log(selectValue)
        setSelectedValue(selectValue);
        setAccordionOpen(!isAccordionOpen);
        onItemSelected(selectValue);
    };

    return(
        <InputContainer>
            <InputAccordion onClick={toggleAccordion}>
                {selectedValue.name === '' ? <span>{label}</span> : <Select>{selectedValue.name}</Select>}
                {isAccordionOpen ? <KeyboardArrowUpIconStyle /> : <KeyboardArrowDownIconStyle />}
            </InputAccordion>

            {isAccordionOpen && (
                <ItemsBox>
                    {itemData.map((item) => (
                        <Items key={item.id} onClick={() => handleSelect(item)}>
                            {item.name}
                        </Items>
                    ))}
                </ItemsBox>
            )}
        </InputContainer>
    )
}

export default SelectBox;

const InputContainer = styled.div``;

const InputAccordion = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: white;
    border: 1px solid #999;
    border-radius: 5px;
    padding: 15px 20px;
    color: gray;
    margin: 0px 5px;
    position: relative;
`;

const Select = styled.div`
    color: #000;
`;

const KeyboardArrowDownIconStyle = styled(KeyboardArrowDownIcon)`
    cursor: pointer;
`;

const KeyboardArrowUpIconStyle = styled(KeyboardArrowUpIcon)`
    cursor: pointer;
`;

const ItemsBox = styled.div`
    max-height: 200px;
    background-color: #fff;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    position: absolute;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: 5px;
    overflow-x: auto;
    &::-webkit-scrollbar {
        width: 4px;
    } 

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    }
    
    &::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    }
`;

const Items = styled.div`
    padding: 15px 20px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 5px;
    
    &:hover {
        background: #eff1f6;
        transition: 0.5s;
    }
`;