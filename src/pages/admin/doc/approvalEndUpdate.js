import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query; // ID를 추출
    console.log(id);

    const handleBack = () => {
        router.back(); // 이전 페이지로 이동
    };

    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageSrc, setImageSrc] = useState("");
    const [insertImageSrc, setInsertImageSrc] = useState('');
    const [samples, setSamples] = useState({
        doc_title: '',
        doc_content: '',
        sign: null,
        admin_sign: null,
    });

    useEffect(() => {
        if(id) {
            axios.get(`http://localhost:8081/admin/doc/adminDetail/${id}`)
            .then((response) => {
                const {doc_id, doc_date, name, doc_status, doc_attachment, category_id, doc_title, doc_content, sign, admin_sign } = response.data;
                let date = new Date();
                let year = date.getFullYear();
                let month = ("0" + (1 + date.getMonth())).slice(-2);
                let day = ("0" + date.getDate()).slice(-2);
            
                let yyyymmdd = year + "-" + month + "-" + day;
                console.log('response.data:', response.data);
                setSamples({
                    doc_id,
                    doc_date,
                    name,
                    doc_status,
                    doc_attachment,
                    category_id,
                    doc_title,
                    doc_content,
                    approval_date: yyyymmdd,
                    sign,
                    admin_sign,
                });
                setImageSrc(`http://localhost:8081/myimage/${response.data.sign}`);
                setSelectedCategory(category_id);
            })
            .catch((error) => {
                console.error("문서 불러오기 실패", error);
            })
        }
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSamples((prevSamples) => ({
        ...prevSamples,
        [name]: value,
        }));
    };

    const handleFileChange = (f) => {
        const file = f.target.files[0];
        setSamples((samples) => ({
        ...samples,
        doc_attachment: file,
        }));
    };

    const hanldeUpdate = () => {
        const updateSamples = new FormData();
        updateSamples.append('doc_status', '완료');
        updateSamples.append('approval_date', samples.approval_date);
        updateSamples.append('approval_content', samples.approval_content);
        updateSamples.append('admin_sign', samples.admin_sign);
        updateSamples.append('sign2', samples.sign);
        const token = localStorage.getItem('token')
        console.log('samples.admin_sign:',samples.admin_sign);
        
        if(id) {
            axios.put(`http://localhost:8081/admin/doc/update/${id}`, updateSamples, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('결재 완료')
                router.push(`/admin/doc/adminApprovalEndDetail?id=${samples.doc_id}`)
            })
            .catch((error) => {
                console.error("결재 실패:", error);
            });
        }
    }

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const encodeFileToBase64 = (fileBlob) => {
        // 첨부파일 전송을 위해 셋팅 
        const file = fileBlob;
        setSamples((samples) => ({
        ...samples,
        admin_sign: file,
        }));

        // 미리보기
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setInsertImageSrc(reader.result);
                resolve();
            };
        });
    };

    return(
        <Container>
            <ApprovalLine>
                <table>
                    <tr>
                        <td>
                        {imageSrc && (
                        <img
                            src={imageSrc}
                            alt="사원사인"
                            style={{ width: "100px", height: "100px" }}
                        />
                        )}
                        </td>
                        <td>
                            {insertImageSrc && <img src={insertImageSrc} alt="관리자사인" style={{width: '100px', height: '100px'}} />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                            <input 
                            type="file"
                            name="signFile"
                            onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                }
                            }
                            />
                        </td>
                    </tr>
                </table>
            </ApprovalLine>
            <Title>
                <H1>결 재</H1>
            </Title>
            <Docstyle1>
                <DocstyleLeft>
                    <table>
                        <tr>
                            <th>문서번호</th>
                            <td>
                                <input 
                                    type="number"
                                    name="doc_id"
                                    readOnly
                                    value={samples.doc_id}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>결재일</th>
                            <td>
                                <input
                                type="date"
                                name="approval_date"
                                value={samples.approval_date}
                                onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>기안자</th>
                            <td>
                                <input 
                                type="text"
                                name="name"
                                value={samples.name}
                                onChange={handleInputChange}
                                />
                                <input 
                                type="hidden"
                                name="doc_status"
                                value={samples.doc_status}
                                onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </table>
                </DocstyleLeft>
                <DocstyleRight>
                    <table>
                        <tr>
                            <th>결재의견</th>
                            <td>
                                <input 
                                type="text"
                                name="approval_content"
                                value={samples.approval_content}
                                onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </table>
                </DocstyleRight>
            </Docstyle1>
            <Docstyle2>
                <table>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    type="text"
                                    name="doc_title"
                                    value={samples.doc_title}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    type="text"
                                    name="doc_content"
                                    value={samples.doc_content}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                </table>
                <br></br>
                <table>
                    <tbody>
                        <tr>
                            <td> </td>
                        </tr>
                        <tr>
                            <th>첨부파일</th>
                            <td>{samples.doc_attachment}</td>
                        </tr>
                    </tbody>
                </table>
            </Docstyle2>
            <CategoryTable>
                <select value={selectedCategory} onChange={CategoryChange}>
                    <option value="">카테고리 선택</option>
                    <option value="1">카테고리 1</option>
                    <option value="2">카테고리 2</option>
                    <option value="3">카테고리 3</option>
                </select>
            </CategoryTable>
            <ButtonStyle>
                <button type="button" onClick={hanldeUpdate}>결재</button>
                <button type="button" onClick={handleBack}>취소</button>
            </ButtonStyle>
        </Container>
    )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
`;

const ApprovalLine = styled.div`
    text-align: right;
    margin-bottom: 20px;
    margin-left: auto;
    tr {
        border: solid 1px;
    };

    td {
        border: solid 1px;
        width: 100px;
        height: 100px;
    }
`;


const Title = styled.div`
text-align: center;
margin-bottom: 20px;
`;

const H1 = styled.h1`
font-size: 30px;
margin-bottom: 10px;
`;

const Docstyle1 = styled.div`
width: 80%;
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`;

const DocstyleLeft = styled.div`
width: 48%;
table {
  width: 100%;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f5f5f5;
  }
}
`;

const DocstyleRight = styled.div`
width: 48%;
display: flex;
justify-content: space-between;
button {
  width: 48%;
  padding: 10px;
  cursor: pointer;
  &:first-child {
    margin-right: 4%;
  }
}
`;

const Docstyle2 = styled.div`
width: 80%;
margin-bottom: 20px;
table {
  width: 100%;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f5f5f5;
  }
}
`;

const CategoryTable = styled.div`
margin-bottom: 20px;
select {
  width: 100%;
  padding: 10px;
}
`;

const ButtonStyle = styled.div`
button {
  width: 48%;
  padding: 10px;
  cursor: pointer;
  &:first-child {
    margin-right: 4%;
  }
}
`;