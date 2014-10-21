'use strict';

/*==========  MAIN ROUTES  ==========*/

module.exports = function( $stateProvider ) {

  return $stateProvider

    .state('main', {
      url: '/main',
      abstract: true,
      resolve: {
        pageInfo: function() {
          return {
            slug: 'main',
            title: 'Main'
          };
        }
      },
      template: require('../partials/main.jade'),
      controller: 'MainCtrl as mainCtrl'
    })

    .state('main.index', {
      url: '',
      views: {
        'mainSection': {
          template: require('../partials/main/main-index.jade')
        }
      }
    })

    .state('main.show', {
      url: '/show',
      views: {
        'mainSection': {
          template: require('../partials/main/main-show.jade')
        }
      }
    });

    // .run(function ($rootScope) {
    //   $rootScope.$on('$stateChangeStart', function () {
    //     console.log('hook into ui-router state')
    //   })
    // })

};
