import F from 'funcunit';
import QUnit from 'steal-qunit';

import 'devjournal/models/test';

import '~/markdown-editor/markdown-editor-test';

import '~/components/html-preview/html-preview-test';

import '~/components/login-button/login-button-test';

F.attach(QUnit);

QUnit.module('devjournal functional smoke test', {
  beforeEach() {
    F.open('./development.html');
  }
});

QUnit.test('devjournal main page shows up', function() {
  F('title').text('devjournal', 'Title is set');
});
