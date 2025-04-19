import { useState } from "react";
import { Modal, Box, TextField, Button, MenuItem, IconButton } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircle } from "@mui/icons-material";

const schema = yup.object().shape({
  text: yup.string().required("Text is required"),
  category: yup.string().required("Category is required"),
});

export const TodoForm = (props: any) => {
  const { onAddTodo } = props;
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: "",
      category: "",
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    const { text, category } = data;

    onAddTodo(text, category);
    handleClose();
  };

  return (
    <>
    <IconButton color="primary" onClick={handleOpen}>
      <AddCircle />
    </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="text"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Todo Text"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Category"
                  select
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              )}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
