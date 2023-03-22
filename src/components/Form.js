import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import {
    FormControl,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Stack,
    Button,
    Container,
} from "@mui/material";

function Form({ setTableData }) {
    const [homeAddress, setHomeAddress] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [kmGoingToWork, setKmGoingToWork] = useState(0);
    const [kmGoingHome, setKmGoingHome] = useState(0);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [month, setMonth] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedMonth = new Date(`2023-${month}-01`);
        const startOfMonthDate = startOfMonth(parsedMonth);
        const endOfMonthDate = endOfMonth(parsedMonth);

        const allDatesInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

        const selectedDates = allDatesInMonth.filter((date) => {
            const dayOfWeek = format(date, 'EEEE');
            return daysOfWeek.includes(dayOfWeek);
        });

        const tableData = selectedDates.map((date) => {
            const formattedDate = format(date, 'dd.MM.yyyy');
            const toWork = {
                date: formattedDate,
                to: workAddress,
                from: homeAddress,
                km: kmGoingToWork,
            };
            const toHome = {
                date: formattedDate,
                to: homeAddress,
                from: workAddress,
                km: kmGoingHome,
            };
            return [toWork, toHome];
        });

        setTableData(tableData);

        navigate('/result');
    };

    return (
        <Container maxWidth='md' sx={{py: 3}}>
        <Stack spacing={2}>
            <Typography variant="h2">Vul het formulier in</Typography>
            <FormControl>
                <Stack spacing={3}>
                <TextField
                    required
                    label="Woonplaats (stad) en postcode:"
                    variant="standard"
                    value={homeAddress}
                    onChange={(e) => setHomeAddress(e.target.value)}
                />
                <TextField
                    required
                    label="Werkplaats (stad) en postcode:"
                    variant="standard"
                    value={workAddress}
                    onChange={(e) => setWorkAddress(e.target.value)}
                />
                <TextField
                    required
                    label="Kilometers naar werk:"
                    type="number"
                    value={kmGoingToWork}
                    onChange={(e) => setKmGoingToWork(Number(e.target.value))}
                />
                <TextField
                    required
                    label="Kilometers naar huis:"
                    type="number"
                    value={kmGoingHome}
                    onChange={(e) => setKmGoingHome(Number(e.target.value))}
                />
               <Typography variant='h5'>Dagen die je naar kantoor gaat</Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={daysOfWeek.includes('Monday')}
                                onChange={() => setDaysOfWeek((prev) => prev.includes('Monday') ? prev.filter((day) => day !== 'Monday') : [...prev, 'Monday'])}
                            />
                        }
                      label="Maandag"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={daysOfWeek.includes('Tuesday')}
                                onChange={() => setDaysOfWeek((prev) => prev.includes('Tuesday') ? prev.filter((day) => day !== 'Tuesday') : [...prev, 'Tuesday'])}
                            />
                        }
                        label="Dinsdag"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={daysOfWeek.includes('Wednesday')}
                                onChange={() => setDaysOfWeek((prev) => prev.includes('Wednesday') ? prev.filter((day) => day !== 'Wednesday') : [...prev, 'Wednesday'])}
                            />
                        }
                        label="Woensdag"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={daysOfWeek.includes('Thursday')}
                                onChange={() => setDaysOfWeek((prev) => prev.includes('Thursday') ? prev.filter((day) => day !== 'Thursday') : [...prev, 'Thursday'])}
                            />
                        }
                        label="Donderdag"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                required
                                checked={daysOfWeek.includes('Friday')}
                                onChange={() => setDaysOfWeek((prev) => prev.includes('Friday') ? prev.filter((day) => day !== 'Friday') : [...prev, 'Friday'])}
                            />
                        }
                        label="Vrijdag"
                    />

                <TextField
                    required
                    label="Nummer van de maand"
                    type="number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <Button variant='contained' onClick={(e) => handleSubmit(e)}>Bereken kilometers</Button>
                </Stack>
            </FormControl>
        </Stack>
        </Container>
    );
}

export default Form;
