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

  const getTickets = (id) => [
    ...columns.find((column) => column.id === id).tickets,
  ];

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    if (destination.droppableId === ID_BOARD) {
      const cloneColumns = [...columns];
      const [removed] = cloneColumns.splice(source.index, 1);
      const newColumns = [
        ...cloneColumns.slice(0, destination.index),
        removed,
        ...cloneColumns.slice(destination.index),
      ];

      dispatch(updateColumns(newColumns));
    } else if (destination.droppableId !== source.droppableId) {
      const sourceTickets = getTickets(source.droppableId);
      const destTickets = getTickets(destination.droppableId);

      const [removed] = sourceTickets.splice(source.index, 1);
      destTickets.splice(destination.index, 0, removed);

      const newColumns = columns.map((column) => {
        if (column.id === source.droppableId)
          return { ...column, tickets: sourceTickets };
        if (column.id === destination.droppableId)
          return { ...column, tickets: destTickets };
        return column;
      });

      dispatch(updateColumns(newColumns));
    } else {
      const tickets = getTickets(source.droppableId);
      const [removed] = tickets.splice(source.index, 1);
      tickets.splice(destination.index, 0, removed);

      const newColumns = columns.map((column) => {
        if (column.id === source.droppableId) return { ...column, tickets };
        return column;
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
