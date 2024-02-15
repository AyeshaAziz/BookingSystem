import { LockClock, LockOpen } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import { GlobalConstants } from '../../GlobalConstants.helper';
import DateTimePickerControl from '../DateTimePicker/DateTimePicker';
import LandingPageService from '../LandingPage.service';
import MultiSelect from '../MultiSelect/MultiSelect';
import SingleSelect from '../SingleSelect/SingleSelect';
import { buttonStyleProps, formControlStyleProps, paperStyleProps } from '../StyleProps/BookingFormStylesProps';
import { User } from '../../Models/Users.model';
import { Device } from '../../Models/Devices.model';
import { DeviceStatusType } from '../Enum/DeviceStatusType.enum';
import { BookingFormModel } from '../../Models/BookingForm.medel';

const USER_LABEL = 'User';
const DEVICES_LABEL = 'Devices';
const BOOK_BUTTON_LABLE = 'Book';
const RELEASE_BUTTON_LABLE = 'Release';
const CONTAINED_VARIANT = 'contained';
const SUB_HEADER = 'Booking: ';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'hh:mm A';

const BookingForm = (props: { users: User[]; devices: Device[] }) => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>(GlobalConstants.EMPTY);
  const [fromDateTime, setFromDateTime] = useState<Dayjs | null>(dayjs(dayjs()));
  const [toDateTime, setToDateTime] = useState<Dayjs | null>(dayjs(dayjs()));
  const handleUserName = (name: string) => {
    setUserName(name);
  };

  const handleSelectedDevices = (updatedDevices: string[]) => {
    setSelectedDevices(updatedDevices);
  };

  const handleFromDateTimeChange = (dateTime: dayjs.Dayjs | null) => {
    setFromDateTime(dateTime);
  };

  const handleToDateTimeChange = (dateTime: dayjs.Dayjs | null) => {
    setToDateTime(dateTime);
  };

  const handleSubmit = () => {
    const formattedFromDateTime = fromDateTime ? formatDateTime(fromDateTime) : GlobalConstants.EMPTY;
    const formattedToDateTime = toDateTime ? formatDateTime(toDateTime) : GlobalConstants.EMPTY;
    if (selectedDevices.length > GlobalConstants.ZERO && userName && formattedFromDateTime) {
      LandingPageService.updateDeviceData({ selectedDevices, userName, formattedFromDateTime, formattedToDateTime });
    }
  };

  const handleClear = () => {
    LandingPageService.updateDeviceData({} as BookingFormModel);
    setUserName(GlobalConstants.EMPTY);
    setSelectedDevices([]);
    setFromDateTime(dayjs(dayjs()));
    setToDateTime(dayjs(dayjs()));
  };

  const formatDateTime = (dateTime: Dayjs): string => {
    const formattedDate = dateTime?.format(DATE_FORMAT);
    const formattedTime = dateTime?.format(TIME_FORMAT);
    return `${formattedDate} ${formattedTime}`;
  };

  // Filter devices based on the status property
  const availableDevices = props.devices.filter((device) => device.status === DeviceStatusType.Available);

  return (
    <>
      <Card sx={paperStyleProps} elevation={GlobalConstants.THREE}>
        <CardHeader subheader={SUB_HEADER}></CardHeader>
        <CardContent>
          <SingleSelect
            label={USER_LABEL}
            options={props.users}
            formStyle={formControlStyleProps}
            emitToParent={handleUserName}
            value={userName}
          />
          <MultiSelect
            selectedOptions={selectedDevices}
            label={DEVICES_LABEL}
            options={availableDevices}
            formStyle={formControlStyleProps}
            emitToParent={handleSelectedDevices}
          />
          <DateTimePickerControl label="From" dateTime={fromDateTime} emitToParent={handleFromDateTimeChange} />
          <DateTimePickerControl label="To" dateTime={toDateTime} emitToParent={handleToDateTimeChange} />
          <div className="buttons-container">
            <Button variant={CONTAINED_VARIANT} startIcon={<LockClock />} onClick={handleSubmit} sx={buttonStyleProps}>
              {BOOK_BUTTON_LABLE}
            </Button>
            <Button variant={CONTAINED_VARIANT} startIcon={<LockOpen />} onClick={handleClear} sx={buttonStyleProps}>
              {RELEASE_BUTTON_LABLE}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingForm;
