import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: "1",
      name: "Yusuf Sayilica",
      assign_a_task: "Navbar Duzenle",
      assignment_status: "Bitti",
      date: "2023-05-22",
    },
    {
      id: "2",
      name: "Mehmet Uzaldi",
      assign_a_task: "Resimleri Duzenle",
      assignment_status: "Bitme Asamasinda",
      date: "2023-05-23",
    },
  ],
};
const crudSlice = createSlice({
  name: "CrudSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      /* 
      !gonderilen taskin id degeri varmi onu kontrol edecegiz
      ? cunku ekleme yapildiysa id degeri gelmeyecek
      ? duzenleme yapildiysa id degeri gelicek
      */

      // ! Objenin id degeri varsa calisir (diziyi gunceller)
      if (action.payload.id) {
        const index = state.tasks.findIndex((i) => i.id === action.payload.id);
        state.tasks[index] = action.payload;
        return;
      }

      // ! Objenin id degeri yoksa calisir (diziye ekler)
      // goreve id ekeleme
      action.payload.id = new Date().getTime();
      // tasks dizisine yeni gorev ekleme
      state.tasks = [...state.tasks, action.payload];

      state.filtredTasks = action.payload;
    },
    removeTask: (state, action) => {
      // tsakin indexini bulma
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      // taski silme
      state.tasks.splice(index, 1);
    },
  },
});

export const { addTask, removeTask, filterBySearch } = crudSlice.actions;
export default crudSlice.reducer;
