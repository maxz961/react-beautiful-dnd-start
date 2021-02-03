import {
  createColumn,
  createTicket,
  updateColumns,
} from "../actions/dashboard";

const initialState = {
  columns: [
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
    case createColumn.type:
      return {
        ...state,
        columns: [...state.columns, { ...action.payload, tickets: [] }],
      };
    case createTicket.type:
      const newColumns = state.columns.map((row) => {
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
        columns: newColumns,
      };
    case updateColumns.type:
      return {
        ...state,
        columns: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
