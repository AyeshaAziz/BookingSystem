import './DeviceStatus.css';

import { Card, CardContent, CardHeader } from '@mui/material';
import React from 'react';

import { GlobalConstants } from '../../GlobalConstants.helper';
import { Device } from '../../Models/Devices.model';
import { DeviceStatusType } from '../Enum/DeviceStatusType.enum';
const RED_COLOUR = 'red';
const GREEN_COLOUR = 'green';
const WHITE_COLOUR = 'white';

const DeviceStatus = (props: { devices: Device[] }) => {
  const getStyles = (status: DeviceStatusType) => {
    switch (status) {
      case DeviceStatusType.NotAvailable:
        return { backgroundColor: RED_COLOUR, color: WHITE_COLOUR};
      default:
        return { backgroundColor:GREEN_COLOUR, color: WHITE_COLOUR};
    }
  };
  return (
    <>
      <Card className="device-info" elevation={GlobalConstants.THREE}>
        <CardHeader subheader="Device Status:" />
        <CardContent className="device-status-content">
          <ul>
            {props.devices.map((device, index) => (
              <li key={index}>
                <strong>{device.name.toUpperCase()} </strong>
                <div className="grid-container">
                  <div className="grid-header">Status</div>
                  <div className="grid-header">Booked by</div>
                  <div className="grid-header">From</div>
                  <div className="grid-header">To</div>
                  <div className="grid-header">IP Address</div>
                  <div className="grid-header">Power Switch</div>


                  <div className="grid-item" style={getStyles(device.status as DeviceStatusType)}>
                    {device.status}
                  </div>
                  <div className="grid-item">{device.bookedBy}</div>
                  <div className="grid-item">{device.from}</div>
                  <div className="grid-item">{device.to}</div>
                  <div className="grid-item">{device.ipAddress}</div>
                  <div className="grid-item">{device.powerSwitch}</div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default DeviceStatus;
