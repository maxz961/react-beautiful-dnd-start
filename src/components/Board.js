import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { updateColumns } from "../store/actions/dashboard";
import Column from "./Column";
import AddColumn from "./AddColumn";

const ID_BOARD = "id_board";

const Board = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.dashboard);

  return (
    <BoardContainer>
      {columns.map((row, index) => (
        <Column key={row.id} {...row} index={index} />
      ))}
      <AddColumn />
    </BoardContainer>
  );
};

export default Board;

const BoardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  height: calc(100vh - 48px);
  padding: 24px;
  background-color: #6f3d3d;
`;
