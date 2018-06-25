'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  console.log(app.model.my_action_log);
  router.get('/', controller.home.index);
};
