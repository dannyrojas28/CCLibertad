// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ionic-audio'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

   $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  })
  
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabCtrl'
  })
.state('tabGrup', {
    url: '/tabGrup',
    abstract: true,
    templateUrl: 'templates/tabsGrupo.html',
    controller: 'TabGrupoCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.inicio', {
    url: '/inicio',
    views: {
      'tab-inicio': {
        templateUrl: 'templates/tab-inicio.html',
        controller: 'InicioCtrl'
      }
    }
  })

  .state('tabGrup.grupos', {
      url: '/grupos',
      views: {
        'tabGrup-grupos': {
          templateUrl: 'templates/tab-grupos.html',
          controller: 'GruposCtrl'
        }
      }
    })
   .state('tabGrup.gruposL', {
      url: '/gruposL',
      views: {
        'tabGrup-gruposL': {
          templateUrl: 'templates/tab-lista-grupos.html',
          controller: 'ListaGruposCtrl'
        }
      }
    })

   .state('tabGrup.gruposS', {
      url: '/gruposS',
      views: {
        'tabGrup-gruposS': {
          templateUrl: 'templates/tab-search-grupos.html',
          controller: 'SearchGruposCtrl'
        }
      }
    })
   .state('grupo-detail', {
    url: '/grupo/:ItemId',
    templateUrl: 'templates/grupo-info.html',
    controller: 'GrupoDetailCtrl'
  })
   
  .state('tab.multimedia', {
    url: '/multimedia',
    views: {
      'tab-multimedia': {
        templateUrl: 'templates/tab-multimedia.html',
        controller: 'MediaCtrl'
      }
    }
   })
  
   .state('album-detail', {
    url: '/album/:ItemId',
    templateUrl: 'templates/album-fotos.html',
    controller: 'AlbumCtrl'
  })

 
   .state('tab.videos', {
    url: '/videos',
    views: {
      'tab-multimedia': {
        templateUrl: 'templates/tab-videos.html',
        controller: 'VideosCtrl'
      }
    }
   })
   .state('video-detail', {
    url: '/video/:Vimeo',
    templateUrl: 'templates/video-vimeo.html',
    controller: 'VimeoCtrl'
   })

  .state('tab.edificate', {
    url: '/edificate',
    views: {
      'tab-edificate': {
        templateUrl: 'templates/tab-edificate.html',
        controller: 'EdificateCtrl'
      }
    }
   }) 
  .state('tab.articulos', {
    url: '/articulos',
    views: {
      'tab-edificate': {
        templateUrl: 'templates/tab-articulos.html',
        controller: 'ArticulosCtrl'
      }
    }
   })
    .state('tab.predicas', {
    url: '/predicas',
    views: {
      'tab-edificate': {
        templateUrl: 'templates/tab-predicas.html',
        controller: 'PredicasCtrl'
      }
    }
  })
    .state('predica-detail', {
    url: '/predica/:TrackId',
    templateUrl: 'templates/predica_audio.html',
    controller: 'PredicaAudioCtrl'
   })

  .state('tab.iglesia', {
    url: '/iglesia',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-iglesia.html',
        controller: 'IglesiaCtrl'
      }
    }
   })
   .state('tab.departamentos', {
    url: '/departamentos',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-departamentos.html',
        controller: 'DepartamentosCtrl'
      }
    }
   })
   .state('dpto-detail', {
    url: '/dpto/:ItemId',
    templateUrl: 'templates/dpto-info.html',
    controller: 'DptoCtrl'
  })
   
   .state('tab.cumpleanos', {
    url: '/cumpleanos',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-cumpleanos.html',
        controller: 'CumpleanosCtrl'
      }
    }
   })
  .state('tab.acerca', {
    url: '/acerca',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-acerca.html',
        controller: 'AcercaCtrl'
      }
    }
   })
  $urlRouterProvider.otherwise('/');

});
