import { createAction } from "@reduxjs/toolkit";

const createColumn = createAction("CREATE_COLUMN");
const createTicket = createAction("CREATE_TICKET");
const updateColumns = createAction("UPDATE_COLUMNS");

export { createColumn, createTicket, updateColumns };
