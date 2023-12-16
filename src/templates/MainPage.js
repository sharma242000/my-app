import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
 
function createData(name, password) {
    return { name, password};
}
 
const rows = [
    createData('TATA HARRIER', 'BLACK'),
    createData('MAHINDRA THAR', 'RED'),
    createData('MARUTI SWIFT', 'WHITE'),
    createData('MG HECTOR', 'BLACK'),
    createData('MERCEDES GLS', 'WHITE'),
];
 
export default function MainPage() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell >
                            Password
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >
                                {row.password}
                            </TableCell>
                
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}