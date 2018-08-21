import React, { Component } from 'react';
import  SettingUps  from '../../../Settings/upsInfo/ups';
import moment from 'moment';
export default class UpsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SettingUps
                searchPage={true}
            />
        )
    }
}
