import React, { PureComponent, Fragment } from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import { Card, Steps } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import NotFound from '../../Exception/404';
import { getRoutes } from '../../../utils/utils';

const { Step } = Steps;

export default class IndexPage extends PureComponent {
  render() {
    const { match, routerData, location } = this.props;
    return (
        <Fragment>
            <Switch>
                {getRoutes(match.path, routerData).map(item => (
                    <Route
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                    />
                ))}
              <Redirect exact from="/setting/baseinfo/battery-list" to="/setting/baseinfo/battery-list/battery" />
              <Route render={NotFound} />
            </Switch>
        </Fragment>
    );
  }
}
