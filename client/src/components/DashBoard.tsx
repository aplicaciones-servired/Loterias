import type { User } from '../types/Interfaces';
import Card from '@mui/material/Card';
import { Suspense } from "react";
import { useAuth } from "../auth/AuthContext";
import LoginPage from "../pages/LoginPage";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import type { JSX } from "react/jsx-runtime";

const DahsBoard = ({ zona }: { zona: User}): JSX.Element => {
  const companyname = zona?.company ?? "Sin empresa";
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage />
      </Suspense>
    )
  }
  return (
    <Card className="justify-self-center border-2 border-solid rounded-xl border-slate-300 w-11/12 mt-10 text-center">
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Word of the Day
          <h1>hola mundo {companyname}</h1>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default DahsBoard
