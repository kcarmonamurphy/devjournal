import QUnit from 'steal-qunit';
import { ViewModel } from './view-logs';

// ViewModel unit tests
QUnit.module('~/components/view-logs');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the view-logs component');
});
