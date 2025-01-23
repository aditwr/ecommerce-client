import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breadcrumb: [
    //     {
    //         label: "Admin Panel",
    //         path: "/admin/dashboard"
    //   },
    //   ...
  ],
};

const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    setBreadcrumb(state, action) {
      // payload : {
      //     level: 0,
      //     label: "Panel",
      //     path: "/admin/dashboard"
      // }
      if (state.breadcrumb.length - 1 > parseInt(action.payload.level)) {
        state.breadcrumb = state.breadcrumb.slice(0, action.payload.level);
        state.breadcrumb[action.payload.level] = {
          label: action.payload.label,
          path: action.payload.path,
        };
      } else {
        state.breadcrumb[action.payload.level] = {
          label: action.payload.label,
          path: action.payload.path,
        };
      }
    },
  },
});

export const { setBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
