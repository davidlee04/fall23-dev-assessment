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
import { useState } from "react";
import { User } from "./types";

type Props = {
  showModal: boolean;
  handleCloseModal: () => void;
  handleAdd: (user: Partial<User>) => any;
};
export const AddModal = ({ showModal, handleCloseModal, handleAdd }: Props) => {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [project, setProject] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  const [showError, setShowError] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const requiredFields = [name, project, email, phone, rating, status];
  const onClose = () => {
    handleCloseModal()
    setStatus("")
    setName("")
    setAvatar("")
    setProject("")
    setEmail("")
    setPhone("")
    setRating("")
    setNotes("")
    setShowError(false)
}
  const generateUser = () => {
    const user = {
        'name': name,
        'avatar': avatar,
        'hero_project': project,
        'notes': notes,
        'email': email,
        'phone': phone,
        'rating': rating,
        'status': status==="Inactive" ? false : true,
    }
    return user;
  }

  const onClick = () => {
    for(const field of requiredFields) {
        if(field==="") {
            setShowError(true);
            return;
        }
    }
    setShowError(false);
    handleAdd(generateUser())
    onClose()
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value)
  }
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject(e.target.value)
  }
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value)
  }
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value)
  }
  
  return (
    <Dialog open={showModal} onClose={onClose}>
      <DialogTitle>Add</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a new volunteer</DialogContentText>
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
          sx={{mb: 4}}
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
            sx={{minWidth: 100}}
          >
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
            <MenuItem value={"Active"}>Active</MenuItem>
          </Select>
        </FormControl>
        {showError && <Alert sx={{mt: 4}}severity="error">Must fill all fields</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClick}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
