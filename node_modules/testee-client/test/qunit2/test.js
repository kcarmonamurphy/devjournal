var unit = window.QUnit;

unit.module('Test module');

unit.test('A failing test', function (assert) {
  assert.equal('A', 'B', 'This test should fail');
});

unit.test('It does something', function (assert) {
  assert.ok(true, 'Test ran!');
});

unit.module('Other module');

unit.test('It does something async', function(assert) {
  var done = assert.async();
  setTimeout(function () {
    assert.ok(true, 'Async test ran!');
    done();
  }, 200);
});
