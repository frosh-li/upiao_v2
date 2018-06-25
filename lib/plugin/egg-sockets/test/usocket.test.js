'use strict';

const mock = require('egg-mock');

describe('test/usocket.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/usocket-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, usocket')
      .expect(200);
  });
});
