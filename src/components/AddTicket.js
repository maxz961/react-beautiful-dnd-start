import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../store/actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const AddTicket = ({ id }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const handleAddTicket = () => {
    if (value.trim() === "") return;
    const newTicket = {
      id: uuidv4(),
      value: value.toUpperCase(),
    };

    dispatch(
      createTicket({
        id,
        newTicket,
      })
    );

    setValue("");
  };

  return (
    <Container>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <AddBtn onClick={handleAddTicket}>ADD TICKET</AddBtn>
    </Container>
  );
};

export default AddTicket;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const Input = styled.input`
  padding: 8px;
`;

const AddBtn = styled.button`
  margin-top: 8px;
  background: #0ea70e;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 8px;
  transition: 0.3s;
  &:hover {
    background: #2abd2a;
  }
`;
