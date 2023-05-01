import './App.css'
import HOME from './componentes/home';
import ALUNOS from './componentes/alunos';
import SOBRE from './componentes/sobre';
import {BrowserRouter,Routes,Link,Route} from 'react-router-dom';

function App() {

  return (
    <>
    <div className='header'>
      <BrowserRouter>
        <ul className='menu'>
          <li><Link className='link' to="/">Página Inicial</Link></li>
          <li><Link className='link'to="/ALUNOS">Cadastro de Alunos</Link></li>
          <li><Link className='link'to="/SOBRE">Sobre</Link></li>
        </ul>

        <Routes>
          <Route path='/' element={<HOME/>}></Route>
          <Route path='/alunos' element={<ALUNOS/>}></Route>
          <Route path='/SOBRE' element={<SOBRE/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
      
  )
}

export default App
