import QUnit from 'steal-qunit';
import { ViewModel } from './html-preview';

// ViewModel unit tests
QUnit.module('~/components/html-preview');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the html-preview component');
});
