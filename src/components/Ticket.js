import React from "react";
import styled from "@emotion/styled";

const Ticket = ({ id, value, index }) => {
  return <TicketContainer>{value}</TicketContainer>;
};

export default Ticket;

const TicketContainer = styled.div`
  background: #3d3d80;
  padding: 16px;
  color: white;
  text-align: center;
  margin-bottom: 16px;
`;
