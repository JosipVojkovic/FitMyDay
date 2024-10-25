import { createSlice } from "@reduxjs/toolkit";

type userDataType{
    name: string | null,
    email: 
}

export const userDataSlice = createSlice({
  name: null,
  email: null,
  password: null,
  height: null,
  weight: null,
  age: null,
  targetWeight: null,
  bmi: null,
});
