import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { Auth } from './components/Auth';
import { Protected } from './components/Protected';
import { Nomatch } from './components/Nomatch';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import './index.css'
import { Navbar } from './components/Navbar';
import EditEmployee from './components/EditEmployee';
import AddEmployee from './components/AddEmployee';
import DisplayEmployee from './components/DisplayEmployee';
import DisplayUser from './components/displayuser';
import Cookies from 'universal-cookie';
import Alert from './components/Alert';
import { useState } from 'react';
const cookies = new Cookies();
function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    },1500)
  }
  
  var c = []
  if(cookies.get('data')){
    c=cookies.get('data')
  }
  else{
    cookies.set('data', [], { path: '/' });
  }
    const [employees, setEmployees] = useState(c);
  const newEmployee = (employee) => {
    let prev = employees;
    prev.push(employee);
    setEmployees(prev);
    cookies.remove('data', { path: '/' });
    cookies.set('data', prev, { path: '/' });
    showAlert('Employee added successfully', 'success');
  }
  const deleteEmployee = (id) => {
    let check = window.confirm('Are you sure you want to delete this Employee?');
    if (check === true) {
      let prev = employees;
      prev.splice(id, 1);
      setEmployees(prev);
      cookies.remove('data', { path: '/' });
      cookies.set('data', prev, { path: '/' });
      showAlert('success', 'Employee deleted successfully');
    } else {
      showAlert('Employee not deleted', 'warning');
    }
  }
  return (
    <div className="App">
          <Auth>
      <Navbar/>
      <Alert alert={alert}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/*' element={<Nomatch/>}/>        
        <Route path='/users' element={<Protected><DisplayEmployee/></Protected>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Protected><AddEmployee/></Protected>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route exact path="/add" element={<AddEmployee showAlert={showAlert} newEmployee={newEmployee}/>}/>
        <Route path="/display" element={<DisplayEmployee showAlert={showAlert} deleteEmployee={deleteEmployee} employees={employees} />}/>
        <Route path="/displayuser" element={<DisplayUser showAlert={showAlert} deleteEmployee={deleteEmployee} employees={employees} />}/>
        <Route path="/edit/:id" element={<EditEmployee employees={employees} showAlert={showAlert} setEmployees={setEmployees}/>} />
      </Routes>
      </Auth>    
    </div>
  );
}

export default App;