import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'devjournal/models/test';

F.attach(QUnit);

QUnit.module('devjournal functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('devjournal main page shows up', function() {
  F('title').text('devjournal', 'Title is set');
});
