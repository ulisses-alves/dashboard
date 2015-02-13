angular.module 'dashboard'
.factory 'urlHelper', ->
  appendSeed: (url) ->
    time = new Date().getTime().toString()
    sym = if url.indexOf('?') < 0 then '?' else '&'
    "#{url}#{sym}seed#{time}=#{time}"
