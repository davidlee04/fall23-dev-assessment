import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "./types";

type Props = {
  showModal: boolean;
  handleCloseModal: () => void;
  handleEdit: (user: Partial<User>) => any;
  oldUser: User;
};
export const EditModal = ({
  showModal,
  handleCloseModal,
  handleEdit,
  oldUser,
}: Props) => {
  const [status, setStatus] = useState(oldUser.status ? "Active" : "Inactive");
  const [name, setName] = useState(oldUser.name);
  const [avatar, setAvatar] = useState(oldUser.avatar);
  const [project, setProject] = useState(oldUser.hero_project);
  const [email, setEmail] = useState(oldUser.email);
  const [phone, setPhone] = useState(oldUser.phone);
  const [rating, setRating] = useState(oldUser.rating);
  const [notes, setNotes] = useState(oldUser.notes);

  const [showError, setShowError] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const requiredFields = [name, project, email, phone, rating, status];
  
  useEffect(()=> {
    const updateFields = () => {
        setName(oldUser.name)
        setAvatar(oldUser.avatar)
        setProject(oldUser.hero_project)
        setEmail(oldUser.email)
        setPhone(oldUser.phone)
        setRating(oldUser.rating)
        setNotes(oldUser.notes)
      }
    if(showModal) {
        updateFields()
    }
  },[showModal, oldUser])
  const onClose = () => {
    handleCloseModal();
  };
  const generateUser = () => {
    const user = {
      name: name,
      avatar: avatar,
      hero_project: project,
      notes: notes,
      email: email,
      phone: phone,
      rating: rating,
      status: status === "Inactive" ? false : true,
    };
    return user;
  };

  const onClick = () => {
    for (const field of requiredFields) {
      if (field === "") {
        setShowError(true);
        return;
      }
    }
    setShowError(false);
    handleEdit(generateUser());
    onClose();
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value);
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  return (
    <Dialog open={showModal} onClose={onClose}>
      <DialogTitle>Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit volunteer</DialogContentText>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          // type="email"
          value={name}
          onChange={handleNameChange}
          fullWidth
          variant="standard"
          //   error={showError}
          required={true}
        />
        <TextField
          margin="dense"
          id="avatar"
          label="Avatar Image URL"
          // type="email"
          value={avatar}
          onChange={handleAvatarChange}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          id="project"
          label="Hero Project"
          // type="email"
          value={project}
          onChange={handleProjectChange}
          fullWidth
          variant="standard"
          //   error={showError}
          required={true}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          variant="standard"
          //   error={showError}
          required={true}
        />
        <TextField
          margin="dense"
          id="phone"
          label="Phone"
          // type="email"
          value={phone}
          onChange={handlePhoneChange}
          fullWidth
          variant="standard"
          //   error={showError}
          required={true}
        />
        <TextField
          margin="dense"
          id="rating"
          label="Rating"
          // type="email"
          value={rating}
          onChange={handleRatingChange}
          fullWidth
          variant="standard"
          //   error={showError}
          required={true}
          //   sx={{mb: 4}}
        />
        <TextField
          margin="dense"
          id="notes"
          label="Notes"
          // type="email"
          value={notes}
          onChange={handleNotesChange}
          fullWidth
          variant="standard"
          sx={{ mb: 4 }}
        />
        <FormControl>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            label="Status"
            // defaultValue={"Inactive"}
            value={status}
            onChange={handleStatusChange}
            sx={{ minWidth: 100 }}
          >
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
            <MenuItem value={"Active"}>Active</MenuItem>
          </Select>
        </FormControl>
        {showError && (
          <Alert sx={{ mt: 4 }} severity="error">
            Must fill all fields
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClick}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};
