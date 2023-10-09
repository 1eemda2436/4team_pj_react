import React from 'react';
import styled from "styled-components";


const ProjectWorkAdd = props => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>프로젝트명</th>
            <td>프로젝트명.</td>
          </tr>
          <tr>
            <th>담당업무</th>
            <td>담당업무.</td>
          </tr>
          <tr>
            <th>기한</th>
            <td>기한.</td>
          </tr>
          <tr>
            <th>진행상황</th>
            <td>진행상황.</td>
          </tr>
          </thead>
          <body>
          <tr>
            <td colSpan={2}>내용</td>
          </tr>
          </body>
      </table>
    </>
  )
}

export default ProjectWorkAdd;

