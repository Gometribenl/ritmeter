import { Link } from 'react-router-dom';
import {Container, Button, Typography} from "@mui/material";

function Home() {
    return (
        <Container maxWidth="md">
            <Typography variant="h1">Welcome bij de ritmeter calculator!</Typography>
            <Typography>
                Om te beginnen klik op de knop hieronder om het formulier te krijgen voor de berekening.
            </Typography>
            <Link to="/form">
                <Button variant="contained">Berekenen</Button>
            </Link>
        </Container>
    );
}

export default Home;
