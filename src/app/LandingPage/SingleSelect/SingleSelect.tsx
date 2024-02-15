import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

import { SingleSelectProps } from './SingleSelectProps';

const ID = 'select-label';
const STANDARD_VARIANT = 'standard';

const SingleSelect = (props: SingleSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    const updatedValue = event.target.value as string;
    props.emitToParent(updatedValue);
  };

  return (
    <div>
      <FormControl variant={STANDARD_VARIANT} sx={props.formStyle}>
        <InputLabel id={ID}>{props.label}</InputLabel>
        <Select labelId={ID} id={ID} value={props.value} onChange={handleChange}>
          {props.options.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SingleSelect;
