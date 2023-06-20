import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface Employee {
    id: number;
    name: string;
    surname: string;
    email: string;
    position: string;
}

interface FetchEmployeesOptions {
  page: number;
}

export const fetchEmployees = createAsyncThunk(
    'employees/fetch',
    async (options: FetchEmployeesOptions) => {
      const response = await axios.get('https://rocky-temple-83495.herokuapp.com/employees', {
        params: {
          _page: options.page,
          _limit: 5
        }
      });
  
      const totalCountHeader = response.headers['x-total-count'];
      const totalCount = totalCountHeader ? parseInt(totalCountHeader, 10) : 0;
      const totalPages = Math.ceil(totalCount / 1);
  
      return { employees: response.data, totalPages };
    }
  );
interface EmployeeState {
  entities: Employee[];
  loading: boolean;
  error: string | null;
  totalPages: number;
}

const initialState: EmployeeState = {
  entities: [],
  loading: false,
  error: null,
  totalPages: 1
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEmployees.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          state.loading = false;
          state.entities = action.payload.employees; // Assign employees array
          state.totalPages = action.payload.totalPages; // Assign totalPages
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred.';
        });
    },
  });

export const selectEmployees = (state: RootState) => state.employees.entities;
export const selectTotalPages = (state: RootState) => state.employees.totalPages;

export default employeeSlice.reducer;
