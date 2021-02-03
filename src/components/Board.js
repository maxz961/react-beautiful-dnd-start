import React from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { updateColumns } from "../store/actions/dashboard";
import Column from "./Column";
import AddColumn from "./AddColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ID_BOARD = "id_board";

const Board = () => {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.dashboard);

  const getRowTickets = (id) => [
    ...columns.find((row) => row.id === id).tickets,
  ];

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (destination.droppableId === ID_BOARD) {
      const cloneColumn = [...columns];
      const [removed] = cloneColumn.splice(source.index, 1);
      const newColumns = [
        ...cloneColumn.slice(0, destination.index),
        removed,
        ...cloneColumn.slice(destination.index),
      ];

      dispatch(updateColumns(newColumns));
    } else if (source.droppableId !== destination.droppableId) {
      const sourceTickets = getRowTickets(source.droppableId);
      const destTickets = getRowTickets(destination.droppableId);

      const [removed] = sourceTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      const newColumns = columns.map((row) => {
        if (row.id === source.droppableId)
          return { ...row, tickets: sourceTickets };
        if (row.id === destination.droppableId)
          return { ...row, tickets: destTickets };

        return row;
      });

      dispatch(updateColumns(newColumns));
    } else {
      const tickets = getRowTickets(source.droppableId);
      const [removed] = tickets.splice(source.index, 1);
      tickets.splice(destination.index, 0, removed);
      const newColumns = columns.map((row) => {
        if (row.id === source.droppableId) return { ...row, tickets };
        return row;
      });
      dispatch(updateColumns(newColumns));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={ID_BOARD} direction="horizontal" type="list">
        {(provided) => (
          <BoardContainer ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map((row, index) => (
              <Column key={row.id} {...row} index={index} />
            ))}
            {provided.placeholder}
            <AddColumn />
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
