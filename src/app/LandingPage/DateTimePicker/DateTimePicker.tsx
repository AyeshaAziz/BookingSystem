import './DateTimePicker.css';

import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

const DATE_TIME_PICKER = 'DateTimePicker';
const DAY = 'day';
const YEAR = 'year';
const MONTH = 'month';
const HOURS = 'hours';
const MINUTES = 'minutes';

const DateTimePickerControl = (props: { label: string, dateTime: Dayjs | null ,emitToParent: (arg: Dayjs | null) => void }) => {
  const handleDateTime = (dateTime: Dayjs | null) => {
    props.emitToParent(dateTime);
  };
  return (
    <div className='date-time-container'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={[`${DATE_TIME_PICKER}`, `${DATE_TIME_PICKER}`]}>
          <DemoItem label={props.label}>
            <DateTimePicker
              value={props.dateTime}
              disablePast
              views={[YEAR, MONTH, DAY, HOURS, MINUTES]}
              onChange={(newDate) => handleDateTime(newDate)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default DateTimePickerControl;
