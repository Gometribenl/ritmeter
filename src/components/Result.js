import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import {useNavigate} from "react-router-dom";
import {Box, Button, Container, Stack, Typography} from "@mui/material";

function Result({ tableData }) {
    const [totalKm, setTotalKm] = useState(0);
    const [totalCompensation, setTotalCompensation] = useState(0);

    const history = useNavigate();

    const headers = [
        { label: "Datum", key: "date" },
        { label: "Van (plaats/postcode)", key: "from" },
        { label: "Naar (plaats/postcode)", key: "to" },
        { label: "Kilometers", key: "km" }
    ]

    const calculateTotal = () => {
        const totalKm = tableData.reduce((acc, row) => acc + row[1].km + row[0].km, 0);
        setTotalKm(totalKm.toFixed(2));
        setTotalCompensation(`€${(totalKm * 0.21).toFixed(2)}`);
    };

    if (tableData === []) {
        history('/form');
    }

    return (
        <Container maxWidth="md">
        <Stack>
            <Typography variant='h2'>Resultaat</Typography>
            <table>
                <thead>
                <tr>
                    <th>Datum</th>
                    <th>Van (plaats/postcode)</th>
                    <th>Naar (plaats/postcode)</th>
                    <th>Kilometers</th>
                    <th>Compensatie</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map(([toWork, toHome], index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <td>{toWork.date}</td>
                            <td>{toWork.from}</td>
                            <td>{toWork.to}</td>
                            <td>{toWork.km}</td>
                            <td>{`€${(toWork.km * 0.21).toFixed(2)}`}</td>
                        </tr>
                        <tr>
                            <td>{toHome.date}</td>
                            <td>{toHome.from}</td>
                            <td>{toHome.to}</td>
                            <td>{toHome.km}</td>
                            <td>{`€${(toHome.km * 0.21).toFixed(2)}`}</td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            <Box sx={{my: 2}}>
                <Typography>Totale kilometers: {totalKm}</Typography>
                <Typography>Totale compensatie: {totalCompensation}</Typography>
            </Box>
            <Button variant="contained" onClick={calculateTotal}>Bereken totaal</Button>
            <CSVLink headers={headers} data={tableData.flat()} filename={`${tableData[0][0].date.substring(0, 7)}-ritmeter.csv`}>
                Download CSV
            </CSVLink>
        </Stack>
        </Container>
    );
}

export default Result;
