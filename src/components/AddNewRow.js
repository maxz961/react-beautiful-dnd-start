import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createRow } from "../store/actions/dashboard";
import { v4 as uuidv4 } from "uuid";
import styled from "@emotion/styled";

const AddNewRow = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleAddNewRow = () => {
    if (value.trim() === "") return;
    dispatch(
      createRow({
        id: uuidv4(),
        title: value.toUpperCase(),
      })
    );

    setValue("");
  };

  return (
    <Container>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <AddBtn onClick={handleAddNewRow}>ADD ROW</AddBtn>
    </Container>
  );
};

export default AddNewRow;

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
