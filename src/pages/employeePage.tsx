import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../redux/employeeSlice';
import { selectEmployees } from '../redux/employeeSlice';
import { AppDispatch } from '../redux/store';

interface Props {
  page?: number;
}

const EmployeesPage: React.FC<Props> = ({ page = 1 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(selectEmployees);

  useEffect(() => {
    dispatch(fetchEmployees({ page }));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(fetchEmployees({ page: newPage }));
  };

  return (
    <div>
      <h2>Employees Page</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>

      {/* Pagination */}
      <button onClick={() => handlePageChange(1)}>Page 1</button>
      <button onClick={() => handlePageChange(2)}>Page 2</button>
      {/* Add more pagination buttons as needed */}
    </div>
  );
};

export default EmployeesPage;

