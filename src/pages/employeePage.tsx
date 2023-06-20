import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, selectEmployees, selectTotalPages } from '../redux/employeeSlice';
import { AppDispatch } from '../redux/store';

interface Props {
  page?: number;
}

const EmployeesPage: React.FC<Props> = ({ page = 1 }) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(selectEmployees);
  const totalPages = useSelector(selectTotalPages);
  const [currentPage, setCurrentPage] = useState(page);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    dispatch(fetchEmployees({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <div>
      <h2>Employees Page</h2>
      {employees.map((employee) => (
        <div key={employee.id}>
          <h2>Name: {employee.name}</h2>
          <h3>Surname: {employee.surname}</h3>
          <p>E-mail: {employee.email}</p>
          <h3>Position: {employee.position}</h3>
          <hr />
        </div>
      ))}

      <h3>Current Page: {currentPage}/{totalPages}</h3>

      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default EmployeesPage;
