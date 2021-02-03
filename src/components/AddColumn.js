import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createColumn } from "../store/actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const AddColumn = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleAddColumn = () => {
    if (value.trim() === "") return;
    dispatch(
      createColumn({
        id: uuidv4(),
        title: value.toUpperCase(),
      })
    );

    setValue("");
  };

  return (
    <Container>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <AddBtn onClick={handleAddColumn}>ADD ROW</AddBtn>
    </Container>
  );
};

export default AddColumn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding-right: 24px;
`;

const Input = styled.input`
  max-width: 100%;
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
