import { Routes, Route} from 'react-router-dom';
import EmployeesPage from './pages/employeePage';
import TasksPage from './pages/tasksPage';
import NavigationBar from './components/nav';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/employees" Component={EmployeesPage} />
            <Route path="/tasks" Component={TasksPage} />
          </Routes>
        </div>
      </Router>
    </Provider>

  );
};

export default App;
