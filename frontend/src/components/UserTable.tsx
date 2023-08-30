import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "./types";
import {
  Avatar,
  Box,
  Checkbox,
  TablePagination,
  Typography,
} from "@mui/material";
import { TableToolbar } from "./TableToolbar";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  users: User[];
  updateApiCalls: () => void;
  updateUserStats: (id: string) => void;
};

export const UserTable = ({
  users,
  updateApiCalls,
  updateUserStats,
}: Props) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const selectAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const selected = users.map((u) => u.id);
      setSelectedUsers(selected);
      return;
    }
    setSelectedUsers([]);
  };
  const selectUser = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    isSelected: boolean
  ) => {
    // event.stopPropagation();
    if (event.target.checked) {
      if (isSelected) return;
      setSelectedUsers([...selectedUsers, id]);
      return;
    } else {
      if (!isSelected) return;
      setSelectedUsers(selectedUsers.filter((n) => n !== id));
    }
    // setSelectedUsers([]);
  };
  const isUserSelected = (id: string) => {
    return selectedUsers.includes(id);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    updateUserStats(id);
    navigate(`/users/${id}`);
  };

  const visibleUsers = useMemo(
    () => users.slice(page * 10, page * 10 + 10),
    [page, users]
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="elevation"
        elevation={18}
        sx={{ width: "100%", mt: 2, mb: 2 }}
      >
        <TableToolbar
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          updateApiCalls={updateApiCalls}
          users={users}
        ></TableToolbar>
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              ".MuiTableCell-root": {
                border: "none",
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow sx={{ bgcolor: "#1a1b1e" }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                      "&.MuiCheckbox-indeterminate": {
                        color: "white",
                      },
                    }}
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    checked={
                      users.length > 0 && selectedUsers.length === users.length
                    }
                    onChange={selectAllUsers}
                    inputProps={{
                      "aria-label": "select all",
                    }}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  padding="none"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  User
                </TableCell>
                <TableCell
                  align="center"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Avatar
                </TableCell>
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Hero Project
                </TableCell>
                {/* <TableCell align="right" padding="normal">
                  Notes
                </TableCell> */}
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Email
                </TableCell>
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Rating
                </TableCell>
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  padding="normal"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleUsers.map((user, i) => {
                const isSelected = isUserSelected(user.id);
                const color = i % 2 === 0 ? "#232427" : "#2c2d31";
                return (
                  <TableRow
                    hover
                    key={user.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      bgcolor: isSelected ? "#505050 !important" : color,
                      "&:hover": {
                        backgroundColor: "#505050 !important",
                      },
                      "&:selected": {
                        backgroundColor: "#505050 !important",
                      },
                    }}
                    selected={isSelected}
                    onClick={(event) => handleRowClick(event, user.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "white",
                          },
                        }}
                        checked={isSelected}
                        inputProps={{
                          "aria-labelledby": user.id,
                        }}
                        onChange={(e) => selectUser(e, user.id, isSelected)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ color: "white" }}
                      padding="none"
                      align="left"
                    >
                      {user.name}
                    </TableCell>
                    <TableCell align="center">
                      <Avatar
                        sx={{
                          m: "auto",
                          minWidth: 75,
                          minHeight: 75,
                        }}
                        alt={user.name}
                        src={user.avatar}
                      />
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.hero_project}
                    </TableCell>
                    {/* <TableCell align="right">{user.notes}</TableCell> */}
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.phone}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.rating}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="right">
                      {user.id}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{
            bgcolor: "#1a1b1e",
            color: "white",
            ".MuiPaginationItem-icon": {
              backgroundColor: "white",
            },
          }}
          rowsPerPageOptions={[10]}
          component="div"
          count={users.length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
};
