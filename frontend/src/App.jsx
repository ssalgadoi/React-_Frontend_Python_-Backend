
import './App.css'
import { Routes, Route } from 'react-router'
import Home from './componets/Home'
import Delete from './componets/Delete'
import Edit from './componets/Edit'
import Create from './componets/Create'
import NavBar from './componets/navbar/NavBar'



function App() {

  return (
    <>
      <NavBar
        content={
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/delete/:id' element={<Delete />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
        }
      />
    </>
  )
}

export default App
