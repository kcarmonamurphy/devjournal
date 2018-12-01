import QUnit from 'steal-qunit';
import { ViewModel } from './login-button';

// ViewModel unit tests
QUnit.module('~/components/login-button');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.message, 'This is the login-button component');
});
