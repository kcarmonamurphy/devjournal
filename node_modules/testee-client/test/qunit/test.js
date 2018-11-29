module('Test module');

test('A failing test', function() {
  equal('A', 'B', 'This test should fail');
  console.error('This test failed');
});

test('It does something', function() {
  ok(true, 'Test ran!');
  console.log('This is a test of console.log collection');
});

module('Other module');

test('It does something async', function() {
  stop();
  setTimeout(function() {
    ok(true, 'Async test ran!');
    start();
  }, 200);
});
