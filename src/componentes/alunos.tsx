import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';

function createAluno(
  id: number,
  name: string,
  email: string,
) {
  return { id, name, email };
}

const initialAlunos = [
  createAluno(1, 'Matheus', 'matheus@gmail.com'),
  createAluno(2, 'Lucas', 'lucas@gmail.com'),
  createAluno(3, 'Rafael', 'rafael@gmail.com'),
  createAluno(4, 'Marcos Andrade', 'marcosAndrade_19@gmail.com'),
];

export default function Alunos() {
  const [alunos, setAlunos] = useState(initialAlunos);
  const [alunoForm, setAlunoForm] = useState({ id: '', name: '', email: '' });
  const [editIndex, setEditIndex] = useState(-1);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlunoForm({
      ...alunoForm,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editIndex === -1) {
      // Adicionar novo aluno
      const newAluno = createAluno(alunos.length + 1, alunoForm.name, alunoForm.email);
      setAlunos([...alunos, newAluno]);
      setAlunoForm({ id: '', name: '', email: '' });
    } else {
      // Atualizar aluno existente
      const updatedAlunos = [...alunos];
      updatedAlunos[editIndex].name = alunoForm.name;
      updatedAlunos[editIndex].email = alunoForm.email;
      setAlunos(updatedAlunos);
      setAlunoForm({ id: '', name: '', email: '' });
      setEditIndex(-1);
    }
  };

  const handleDelete = (index: number) => {
    const updatedAlunos = [...alunos];
    updatedAlunos.splice(index, 1);
    setAlunos(updatedAlunos);
  };

  const handleEdit = (index: number) => {
    const aluno = alunos[index];
    setAlunoForm({ id: aluno.id, name: aluno.name, email: aluno.email });
    setEditIndex(index);
  };

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label className='label' >
          Nome:
          <input className='input' type="text" name="name" value={alunoForm.name} onChange={handleFormChange} placeholder='Nome Completo'/>
        </label>
        <label className='label'>
          E-mail:
          <input className='input'type="email" name="email" value={alunoForm.email} onChange={handleFormChange} placeholder='E-mail'/>
        </label>
        <button className='bnt' type="submit">{editIndex === -1 ? 'Adicionar' : 'Atualizar'}</button>
      </form>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno, index) => (
              <TableRow
                key={aluno.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{aluno.id}</TableCell>
                <TableCell align="right">{aluno.name}</TableCell>
                <TableCell align="right">{aluno.email}</TableCell>
                <TableCell align="right">
                  <button className='bnt-atualizar' onClick={() => handleEdit(index)}>Atualizar</button>
                  <button className='bnt-excluir' onClick={() => handleDelete(index)}>Excluir</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

}