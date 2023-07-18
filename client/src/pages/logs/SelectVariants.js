import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectVariants({ label, data, value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl
        variant='filled'
        sx={{ minWidth: 280 }}
      >
        <InputLabel id='demo-simple-select-filled-label'>{label}</InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={value}
          onChange={handleChange}
        >
          {data.map((element, index) => (
            <MenuItem
              key={index}
              value={element.value}
            >
              {element.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
