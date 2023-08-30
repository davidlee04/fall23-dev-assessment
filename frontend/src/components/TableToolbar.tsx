import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "./types";
import { Dispatch, SetStateAction, useState } from "react";
import { AddModal } from "./AddModal";
import { EditModal } from "./EditModal";

type Props = {
  //   selected: number;
  selectedUsers: string[];
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
  updateApiCalls: () => void;
  users: User[];
};

export const TableToolbar = ({
  selectedUsers,
  setSelectedUsers,
  updateApiCalls,
  users,
}: Props) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const onDelete = async () => {
    const ids = selectedUsers.join(",");
    try {
      const response = await fetch(
        `http://localhost:5005/api/bog/users/${ids}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        console.error("Error deleting entries");
      }
      const responseData = await response.json();
      console.log("Deletion success");
      updateApiCalls();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Failed to delete");
    }
  };

  const onAdd = async (newUser: Partial<User>) => {
    // console.log(newUser["name"]);
    try {
      const response = await fetch(`http://localhost:5005/api/bog/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.error);
      } else {
        console.log("User added");
        updateApiCalls();
      }
    } catch (error) {
      console.error("Failed to add");
    }
  };

  const onEdit = async (updatedUser: Partial<User>) => {
    if (selectedUsers.length !== 1) {
      console.error("Can't edit more than 1 volunteer");
    }
    const id = selectedUsers[0];
    try {
      const response = await fetch(
        `http://localhost:5005/api/bog/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        console.error(data.error);
      } else {
        console.log("User edited");
        updateApiCalls();
      }
    } catch (error) {
      console.error("Failed to edit");
    }
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const selected = selectedUsers.length;
  return (
    <Toolbar sx={{bgcolor: "black"}}>
      {selected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="white"
          variant="h5"
          component="div"
        >
          {selected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", fontWeight: "bold"}}
          variant="h5"
          id="tableTitle"
          component="div"
          color="white"
        >
          Volunteer List
        </Typography>
      )}
      {selected > 0 ? (
        <>
          <Tooltip title="Delete selected">
            <IconButton onClick={onDelete}>
              <DeleteIcon sx={{fill: "white"}}/>
            </IconButton>
          </Tooltip>
          {selected === 1 && (
            <Tooltip title="Edit volunteer">
              <IconButton onClick={handleOpenEditModal}>
                <EditIcon sx={{fill: "white"}}/>
              </IconButton>
            </Tooltip>
          )}
        </>
      ) : (
        <Tooltip title="Add volunteer">
          <IconButton onClick={handleOpenAddModal}>
            <AddIcon sx={{fill: "white"}}/>
          </IconButton>
        </Tooltip>
      )}
      <AddModal
        showModal={showAddModal}
        handleCloseModal={handleCloseAddModal}
        handleAdd={onAdd}
      ></AddModal>
      <EditModal
        showModal={showEditModal}
        handleCloseModal={handleCloseEditModal}
        handleEdit={onEdit}
        oldUser={getUserById(users, selectedUsers[0])}
      ></EditModal>
    </Toolbar>
  );
};

export const getUserById = (users: User[], id: string) => {
//   console.log(users);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
    //   console.log("found");
    //   console.log(users[i]);
      return users[i];
    }
  }
  return {
    name: "dummy",
    avatar: "",
    hero_project: "dummy",
    notes: "dummy",
    email: "dummy",
    phone: "dummy",
    rating: "1",
    status: false,
    id: "0",
  };
};
