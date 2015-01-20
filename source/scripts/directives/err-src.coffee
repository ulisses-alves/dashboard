angular.module 'dashboard'
.directive 'dbErrSrc', ->
  link: (scope, element, attrs) ->
    element.bind 'error', ->
      console.log 'err'
      unless attrs.src is attrs.dbErrSrc
        attrs.$set 'src', attrs.dbErrSrc
    return
