import QUnit from 'steal-qunit';
import { ViewModel } from './markdown-editor';

// ViewModel unit tests
QUnit.module('~/markdown-editor');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the markdown-editor component');
});
