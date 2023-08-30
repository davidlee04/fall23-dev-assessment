import { Container } from "@mui/material";
import { UserTable } from "./UserTable";
import { Dispatch, SetStateAction } from "react";
import { User } from "./types";

type Props = {
  users: User[];
  updateApiCalls: ()=>void;
  updateUserStats: (id: string)=>void;
};

export const Home = ({ users, updateApiCalls, updateUserStats }: Props) => {
  return (
    <Container>
      <UserTable users={users} updateApiCalls={updateApiCalls} updateUserStats={updateUserStats} />
    </Container>
  );
};
