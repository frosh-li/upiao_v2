import React, { Component } from 'react';
import  SettingBattery  from '../../Settings/batteryInfo/battery';
import moment from 'moment';
export default class BatteryPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SettingBattery
                searchPage={true}
            />
        )
    }
}
