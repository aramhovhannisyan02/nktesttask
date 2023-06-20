import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
interface Employee {
  id: number;
  name: string;
  // Add more properties as needed
}

interface FetchEmployeesOptions {
  page: number;
}

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (options: FetchEmployeesOptions) => {
    const { page } = options;
    const response = await axios.get<Employee[]>(
      `https://rocky-temple-83495.herokuapp.com/employees?_page=${page}&_limit=10`
    );
    return response.data;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState: [] as Employee[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectEmployees = (state: RootState) => state.employees;

export default employeesSlice.reducer;
