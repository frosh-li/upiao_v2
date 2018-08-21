import React, { Component } from 'react';
import  SettingStation  from '../../Settings/station/station';
import moment from 'moment';
export default class StationPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SettingStation
                searchPage={true}
            />
        )
    }
}
