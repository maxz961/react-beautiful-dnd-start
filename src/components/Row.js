import React from "react";
import styled from "@emotion/styled";

import AddNewTicket from "./AddNewTicket";
import Ticket from "./Ticket";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Row = ({ id, title, tickets, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <RowContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <WrapContent>
            <Header>{title}</Header>
            <Droppable droppableId={id}>
              {(provided) => (
                <TicketsWrap
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tickets.map((ticket, index) => (
                    <Ticket key={ticket.id} {...ticket} index={index} />
                  ))}
                  {provided.placeholder}
                  <AddNewTicket id={id} />
                </TicketsWrap>
              )}
            </Droppable>
          </WrapContent>
        </RowContainer>
      )}
    </Draggable>
  );
};

export default Row;

const RowContainer = styled.div`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid transparent;
  margin-right: 16px;
  height: fit-content;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  // background-color: #9f9fab;
  min-width: 200px;
  max-width: 200px;
  font-family: Arial;
  height: 100%;
  background-color: ${({ isDragging }) => (isDragging ? "#cc9bb2" : "#9f9fab")};
`;

const TicketsWrap = styled.div`
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "#7abfca" : "inherit"};
  height: 100%;
  padding: 8px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Header = styled.h3`
  text-align: center;
  // background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "red" : "#9f9fab"};
`;
