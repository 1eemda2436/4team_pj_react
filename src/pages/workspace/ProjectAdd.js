import React from 'react';
import styled from "styled-components";


const ProjectAdd = props => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>프로젝트명</th>
            <td>프로젝트명.</td>
          </tr>
          <tr>
            <th>기한</th>
            <td>기한.</td>
          </tr>
          <tr>
            <th>팀원</th>
            <td>팀원.</td>
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

export default ProjectAdd;

