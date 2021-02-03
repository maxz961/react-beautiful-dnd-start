import React from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Ticket = ({ id, value, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <TicketContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {value}
        </TicketContainer>
      )}
    </Draggable>
  );
};

export default Ticket;

const TicketContainer = styled.div`
  background: #3d3d80;
  padding: 16px;
  color: white;
  text-align: center;
  margin-bottom: 16px;
`;
