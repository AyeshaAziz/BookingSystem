import { Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import React from 'react';

import { GlobalConstants } from '../../GlobalConstants.helper';
import { MultiSelectProps } from './MultiSelectProps';

const ID = 'select-label';
const STANDARD_VARIANT = 'standard';
const getStyles = (name: string, personName: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -GlobalConstants.ONE
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const MultiSelect = (props: MultiSelectProps) => {
  const theme = useTheme();
  const handleSelectedOptions = (event: SelectChangeEvent<string[]>) => {
    const updatedValues = event.target.value as string[];
    props.emitToParent(updatedValues);
  };
  return (
    <div>
      <FormControl variant={STANDARD_VARIANT} sx={props.formStyle}>
        <InputLabel id={ID}>{props.label}</InputLabel>
        <Select
          labelId={ID}
          id={ID}
          multiple
          value={props.selectedOptions}
          onChange={handleSelectedOptions}
          renderValue={(selected) => (
            <div>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </div>
          )}
        >
          {props.options.map((option) => (
            <MenuItem
              key={option.name}
              value={option.name}
              style={getStyles(option.name, props.selectedOptions, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
