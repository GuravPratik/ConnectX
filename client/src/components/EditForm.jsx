import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";

const StyledButton = styled(Button)(() => ({
  margin: "5px",
}));

function EditForm({ defaultValue, stateFunction, updateFunction, isUpdating }) {
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <>
      <input
        style={{ width: "100%", padding: "10px" }}
        defaultValue={inputValue}
        placeholder="Update a caption"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <StyledButton
        disabled={isUpdating}
        variant="contained"
        size="small"
        sx={{
          margin: "5px",
        }}
        onClick={() => updateFunction(inputValue)}
      >
        {!isUpdating ? `Update` : `Updating...`}
      </StyledButton>
      <StyledButton
        disabled={isUpdating}
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
