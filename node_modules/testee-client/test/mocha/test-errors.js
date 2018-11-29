describe('mocha', function() {
  describe('Errors in setup/teardown', function() {
    describe('before', function() {
      before(function() {
        throw new Error('Test error');
      })
      it('passes', function() {
        expect(true).to.equal(true);
      })
    })
    describe('beforeEach', function() {
      beforeEach(function() {
        throw new Error('Test error');
      })
      it('passes', function() {
        expect(true).to.equal(true);
      })
    })
    describe('afterEach', function() {
      afterEach(function() {
        throw new Error('Test error');
      })
      it('passes', function() {
        expect(true).to.equal(true);
      })
    })
    describe('after', function() {
      after(function() {
        throw new Error('Test error');
      })
      it('passes', function() {
        expect(true).to.equal(true);
      })
    })
  })
});
