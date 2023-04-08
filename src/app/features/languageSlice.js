import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: {
    id: "Buat Akun",
    en: "Create Account",
  },
  description: {
    id: "Di bawah ini adalah contoh formulir yang dibuat seluruhnya dengan kontrol formulir Bootstrap. Setiap grup formulir yang diperlukan memiliki status validasi yang dapat dipicu dengan mencoba mengirimkan formulir tanpa menyelesaikannya.",
    en: "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.",
  },

  titleChange: "Create Account",
  descriptionChange:
    "Below is an example form built entirely with Bootstrap’s form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.",
};

export const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    changeLanguage: (state, actions) => {
      if (actions.payload) {
        state.titleChange = state.title.id;
        state.descriptionChange = state.description.id;
      } else {
        state.titleChange = state.title.en;
        state.descriptionChange = state.description.en;
      }
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
