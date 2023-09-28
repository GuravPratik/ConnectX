import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";

const StyledButton = styled(Button)(() => ({
  margin: "5px",
}));

function EditForm({ defaultValue, stateFunction, updateFunction }) {
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <>
      <input
        style={{ width: "100%", padding: "10px" }}
        defaultValue={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <StyledButton
        variant="contained"
        size="small"
        sx={{
          margin: "5px",
        }}
        onClick={() => updateFunction(inputValue)}
      >
        update
      </StyledButton>
      <StyledButton
        size="small"
        variant="contained"
        onClick={() => stateFunction(false)}
      >
        Cancel
      </StyledButton>
    </>
  );
}

export default EditForm;
