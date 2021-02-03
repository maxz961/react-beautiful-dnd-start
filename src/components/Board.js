import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { updateRows } from "../store/actions/dashboard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Row from "./Row";
import AddNewRow from "./AddNewRow";

const ID_BOARD = "id_board";

const Board = () => {
  const dispatch = useDispatch();
  const { rows } = useSelector((state) => state.dashboard);

  const getRows = (id) => [...rows.find((row) => row.id === id).tickets];

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (destination.droppableId === ID_BOARD) {
      const copyRows = rows.splice();
      const [removed] = copyRows.splice(source.index, 1);

      const newRows = [
        ...copyRows.slice(0, destination.index),
        removed,
        ...copyRows.slice(destination.index),
      ];

      dispatch(updateRows(newRows));
      return;
    } else if (source.droppableId !== destination.droppableId) {
      const sourTickets = getRows(source.droppableId);
      const destTickets = getRows(destination.droppableId);

      const [removed] = sourTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      const newRows = rows.map((row) => {
        if (row.id === source.droppableId)
          return { ...row, tickets: sourTickets };
        if (row.id === destination.droppableId)
          return { ...row, tickets: destTickets };

        return row;
      });

      dispatch(updateRows(newRows));
    } else {
      const tickets = getRows(source.droppableId);

      const [removed] = tickets.splice(source.index, 1);
      tickets.splice(destination.index, 0, removed);

      const newRows = rows.map((row) => {
        if (row.id === source.droppableId) return { ...row, tickets };
        return row;
      });

      dispatch(updateRows(newRows));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={ID_BOARD} direction="horizontal" type="list">
        {(provided) => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {rows.map((row, index) => (
              <Row key={row.id} {...row} index={index} />
            ))}
            {provided.placeholder}
            <AddNewRow />
          </BoardContainer>
        )}
      </Droppable>
    </DragDropContext>
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
