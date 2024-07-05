import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

// Definimos la interfaz Row que describe la estructura de cada fila
interface Row {
  rangeHours: string;
  windDirection: string;
}

interface Config {
  rows: Row[];
}

export default function BasicTable({ rows: propRows }: Config) {
  // Declaramos la variable de estado rows con el tipo Row[]
  let [rows, setRows] = useState<Row[]>([]);

  // Hook useEffect que actualiza la variable de estado rows cuando cambian los props
  useEffect(() => {
    setRows(propRows);
  }, [propRows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rango de horas</TableCell>
            <TableCell align="right">Direccion del viento</TableCell>
            <TableCell align="right">Velocidad del viento</TableCell>
            <TableCell align="right">Rafagas del viento</TableCell>
            {/*<TableCell align="right">P</TableCell>*/}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.rangeHours}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.rangeHours}
              </TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
              {/*<TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
