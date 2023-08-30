import { Route, Routes, useParams } from "react-router-dom";
import { getUserById } from "./TableToolbar";
import { User } from "./types";
import { Avatar, Box, Card, Typography } from "@mui/material";

type VolunteerDetailsProps = {
  users: User[];
  userStats: { [id: string]: number };
};

const VolunteerDetails = ({ users, userStats }: VolunteerDetailsProps) => {
  const { id } = useParams();
  const idDefined = id ?? "";
  const user = getUserById(users, idDefined);
  return (
    <Box sx={{mt: 4}}>
    <Card
      sx={{
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        m: "auto",
        bgcolor: "primary.main",
      }}
    //   variant="outlined"
    >
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ minWidth: 300, minHeight: 300, mb: 3, mt: 3 }}
      />
      <Typography variant="h4" color="white" align="center" sx={{fontWeight: "bold", mb: 2}}>{user.name}</Typography>
      <Typography color="white" align="center">{`Times clicked on: ${userStats[idDefined]}`}</Typography>
      <Typography color="white" sx={{mb: 3}} align="center">{`Notes: ${user.notes}`}</Typography>
    </Card>
    </Box>
  );
};

type Props = {
  users: User[];
  userStats: { [id: string]: number };
};

export const Volunteers = ({ users, userStats }: Props) => {
  return (
    <Routes>
      <Route
        path=":id"
        element={<VolunteerDetails users={users} userStats={userStats} />}
      />
    </Routes>
  );
};
