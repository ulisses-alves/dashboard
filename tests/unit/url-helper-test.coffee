describe 'dashboard.urlHelper', ->
  beforeEach module('dashboard')

  describe '.appendSeed(url)', ->
    url = null

    describe "when url doesn't contain query string", ->
      beforeEach ->
        url = 'http://domain.test/resource/'

      it 'should append question mark', inject (urlHelper) ->
        result = urlHelper.appendSeed url
        expect(result.indexOf url).toBe 0
        expect(result.match(/\?seed\d+=\d+$/).length).toBe 1

    describe 'when url contains query string', ->
      beforeEach ->
        url = 'http://domain.test/resource/?arg1=yes&arg2=no'

      it 'should append ampersand', inject (urlHelper) ->
        result = urlHelper.appendSeed url
        expect(result.indexOf url).toBe 0
        expect(result.match(/\&seed\d+=\d+$/).length).toBe 1
