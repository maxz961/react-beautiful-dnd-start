import { createRow, createTicket, updateRows } from "../actions/dashboard";

const initialState = {
  rows: [
    {
      id: "1",
      title: "TODO",
      tickets: [
        {
          id: "ticket-id-1",
          value: "TEST",
        },
      ],
    },
    {
      id: "2",
      title: "PROGRES TODO",
      tickets: [
        {
          id: "ticket-id-2",
          value: "ASD",
        },
      ],
    },
  ],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case createRow.type:
      return {
        ...state,
        rows: [...state.rows, { ...action.payload, tickets: [] }],
      };
    case createTicket.type:
      const newRows = state.rows.map((row) => {
        if (row.id === action.payload.id) {
          return {
            ...row,
            tickets: [...row.tickets, action.payload.newTicket],
          };
        }
        return row;
      });

      return {
        ...state,
        rows: newRows,
      };
    case updateRows.type:
      console.log("TTTTTT", action.payload);
      return {
        ...state,
        rows: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
