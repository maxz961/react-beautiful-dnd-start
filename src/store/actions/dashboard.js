import { createAction } from "@reduxjs/toolkit";

const createRow = createAction("CREATE_ROW");
const createTicket = createAction("CREATE_TICKET");
const updateRows = createAction("UPDATE_ROWS");

export { createRow, createTicket, updateRows };
