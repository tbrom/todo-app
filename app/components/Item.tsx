import { RemoveCircle } from "@mui/icons-material";
import { Box, Checkbox, IconButton, styled } from "@mui/material";
import { Todo } from "./TodoList";
import clsx from "clsx";

const StyledIconButton = styled(IconButton)(() => ({
  "&:hover": {
    color: "hsla(0, 100.00%, 50.80%, 0.54)",
  },
}));

export const Item = (props: any) => {
  const { handleDeleteTodo, handleToggleTodo, todo } = props;

  return (
    <Box {...getCardBoxProps()}>
      <Box ml={1}>
        <Checkbox
          checked={todo.completed}
          color="success"
          onChange={() => handleToggleTodo(todo.id)}
        />
      </Box>
      <Box sx={{ flex: "auto" }}>
        <h3 className={getTitleClass()}>{todo.text}</h3>
        <p className="text-sm text-gray-500">{todo.category}</p>
      </Box>
      <Box ml={1}>
        <StyledIconButton
          size="small"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <RemoveCircle />
        </StyledIconButton>
      </Box>
    </Box>
  );

  function getCardBoxProps() {
    return {
      bgcolor: "#f5f5f5",
      borderRadius: 4,
      display: "flex",
      gap: 2,
      key: todo.id,
      margin: "8px 0",
      p: 1.5,
      sx: {
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
        alignItems: "center",
      },
    };
  }

  function getTitleClass() {
    return clsx("text-lg font-semibold", todo.completed && "line-through");
  }
};
