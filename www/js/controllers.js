angular.module('starter.controllers', ['ionic', 'ngCordova','ionic-audio'])
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('IntroCtrl', function($ionicPlatform,$scope, $state, $ionicSlideBoxDelegate,  $stateParams,$ionicPopup, $http, $sce, $ionicModal,$ionicLoading,$filter,$cordovaDevice) {
  // Called to navigate to the main app
  //localStorage.removeItem('nameccl');

      console.log("intro")
      uuid = 'f7e6b12f183bf56';
         console.log(uuid);
        if(localStorage.getItem('nameccl') == null){
           //Quitamos la propiedad display none del id del div principal
           $('#Intro').css('display','block');
           var link = 'http://cclapp.com/SERVER_APP/_controlesApp/verificauuid.php';
            $http.post(link, {uuid: uuid }).then(function (data){
              console.log(data.data);
              var pr=data.data;
              console.log(pr.mensaje);
              if(pr.mensaje == "true"){
                localStorage.setItem('nameccl',pr.name);
                localStorage.setItem('emailccl',pr.email);
                localStorage.setItem('celccl',pr.celular);
                localStorage.setItem('fechaccl',pr.fecha);
                  //$state.go('list');
                  $scope.login = {
                    nombres :  localStorage.getItem('nameccl'),
                    email   :  localStorage.getItem('emailccl'),
                    numero  :  localStorage.getItem('celccl'),
                    fecha   :  "",
                    state   :  0
                 };
                  $scope.date = localStorage.getItem('fechaccl');
              }else{
                 //obtenemos los datos de los input del formulario
                   $scope.login = {
                      nombres : "",
                      email   : "",
                      numero  : "",
                      fecha   : "",
                      state   : 0
                   };
                   $scope.date = "";
              }
            });
              
        }else{
             $state.go('tab.inicio');
        }
        $scope.startApp = function() {
          $state.go('login');
        };
        $scope.next = function() {
          $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function() {
          $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
          $scope.slideIndex = index;
        };


     


        //funcion para mostrar cargando cuando se envian los datos
        $scope.show = function() {
        $ionicLoading.show({
          template: 'Cargando.. <ion-spinner class="spinner-energized"></ion-spinner>'
        }).then(function(){
           console.log("The loading indicator is now displayed");
        });
      };
      //funcion para ocultar el cargando

      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
      };

       

       

      //funcion para enviar la peticion al servidor
      $scope.authenticate = function() {
          nombres  = $scope.login.nombres;
          email    = $scope.login.email;
          numero   = $scope.login.numero;
          fecha    = "1996-07-28"; 
          state    = $scope.login.state;
          console.log( nombres+" - "+email+" - "+numero+" - "+fecha+" - "+state)
          var link = 'http://cclapp.com/SERVER_APP/_controlesApp/reg-usuarios.php';
     
            $http.post(link, {nombre: nombres,email : email,cel : numero,fecha : fecha,uuid: uuid,estado:state}).then(function (data){
              console.log(data);
              var pr=data.data;
              $scope.hide();
              if(pr.state == 1){
                     var alertPopup = $ionicPopup.alert({
                      title: 'Bienvenido',
                      template: pr.mensaje,
                       buttons: [
                            {
                              text: 'Gracias',
                              type: 'button-positive',
                              onTap:function(e) {
                                  $state.go('tab.inicio');
                                }
                            }
                        ]   
                    });

              }else{
                     var confirmPopup = $ionicPopup.confirm({
                       title: 'Datos Registrados',
                       template: pr.mensaje,
                       scope: $scope,
                       buttons: [
                            { text: 'Cancelar', 
                               type: 'button-stable'},
                            {
                              text: 'Aceptar',
                              type: 'button-stable',
                              onTap:function(e) {
                                  $scope.login.state=1;
                                  $scope.authenticate();
                                }
                            }
                          ]
                     });
                   
              }

              /*var print = JSON.parse(res);
                if(print[0]['mensaje'] == '1'){
                    $state.go('app.activity');  
                }else{
                    
                }*/
            });
        };

          /*
            //funcion para utilizar los modales
          */
          $ionicModal.fromTemplateUrl('templates/modal-privacidad.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.openModal = function() {
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
          // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
          // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });
          /*
            //se cierran los modales
          */
    })




.controller('InicioCtrl', function($scope, $http,$state) {
      //creamos las variables de saludo
      var texto  = "";
      var imagen = "";
      date=new Date(); 
      hora=date.getHours();

    //  En estas 4 líneas le decimos que: si la hora de la PC es menor a 12 PM, que muestre el saludo: Buenos Días y a su vez que nos muestre nuestra imagen: dia.jpg . 
    if(hora<12){
      texto="Buenos Días ";  
      imagen="sun.png";
    }

    // Las demás líneas hacen lo mismo: si la hora de la PC es tal, entonces que nos muestre el saludo correspondiente y también su imagen correspondiente. 

    if(hora>=12 && hora<19){
    texto="Buenas Tardes ";
    imagen="sunset.png";
    }

    if(hora>=19 && hora<24){
    texto="Buenas Noches ";
    imagen="moon.png";
    }

  //guardamos los meses en un array y obtenemos la fecha para mostrarla en el saludo
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var dias  = new Array ("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
  fecha = dias[date.getDay()] + " "+date.getDate() + " de " + meses[date.getMonth()] + " del " + date.getFullYear();


  var name =localStorage.getItem('nameccl').split(" ");
  var hora = texto+name[0]+" Dios te bendiga";
  fecha = fecha;
  //se ejecuta la peticion al servidor para obtener la ultima foto de los albumes y mostrarla
  var link = 'http://cclapp.com/SERVER_APP/_controlesApp/devocional.php';
  $http.post(link, {dia: date.getDay()}).then(function (result){
    console.log(result);
    var print = result.data;
    console.log(result.data[0].imagen)
    $scope.data = {
      fecha   : fecha,
      hora    : hora,
      imagen  : imagen,
      devocional : result.data[0].imagen
    }
  });      
  var link4 = "http://cclapp.com/SERVER_APP/_controlesApp/video.php";
  $http.post(link4, {}).then(function (result){
    console.log(result);
    var print = result.data;
        $scope.videos = {
         "imagen"  : result.data[0].foto,
         "url": result.data[0].url,
         "fecha":result.data[0].fecha,
         "nombre":result.data[0].nombre
      }
  });
  //se ejecuta la peticion al servidor para obtener la ultima foto de los albumes y mostrarla
  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/album.php';
  $http.post(link2, {}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.galeria = {
      imagen  : result.data[0].url,
      nombre  : result.data[0].nombre,
      id  : result.data[0].id
    }
  });   

   var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/predicas.php';
  $http.post(link3, {dia: date.getDay()}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.predica = {
      imagen      : result.data[0].imagen,
      predicador  : result.data[0].predicador,
      nombre      : result.data[0].nombre_predica
    }
  });   
  
})
.controller('TabCtrl', function($scope) {
  console.log('hola')
  $scope.user = {
    Name : localStorage.getItem('nameccl')
  };
})
.controller('AppCtrl', function($scope){

})

.controller('GruposCtrl', function($scope, $cordovaGeolocation, $ionicPopup, $state, $ionicLoading) {

   var options = {timeout: 100, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
  }, function(error){
     var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: 'Verifica que la ubicación esté activa y tu dispositivo tenga señal e intenta nuevamente. <br> Si el problema persiste debes reiniciar tu dispositivo!'
        });
  });

})


.controller('MediaCtrl', function($scope, $ionicModal,$state,$http) {

  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/album.php';
  $http.post(link2, {}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.items = [];
    for(var i = 0; i < result.data.length;i++){
      console.log(result.data[i].nombre)
      $scope.items.push({ "imagen"  : result.data[i].url, "nombre"  : result.data[i].nombre, "id"  : result.data[i].id});
      }
    }) 
})
.controller('AlbumCtrl',function($scope, $stateParams,$http,  $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/fotos.php';
  $http.post(link2, {id:$stateParams.ItemId}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.albums = [];
    console.log( result.data[0].nombre)
    for(var i = 1; i < result.data.length;i++){
      $scope.albums.push({ "imagen"  : result.data[i].url});

    $scope.nombre  = result.data[i].nombre;
      }
    }) 
    $scope.zoomMin = 1;
     $scope.slideVisible = function(index){
        if(  index < $ionicSlideBoxDelegate.currentIndex() -1 
       || index > $ionicSlideBoxDelegate.currentIndex() + 1){
      return false;
    }
        return true;
    }
    $scope.updateSlideStatus = function(slide) {
      var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
      if (zoomFactor == $scope.zoomMin) {
        $ionicSlideBoxDelegate.enableSlide(true);
      } else {
        $ionicSlideBoxDelegate.enableSlide(false);
      }
    };
})

.controller('VideosCtrl', function($scope, $ionicModal,$state,$http) {
  var link = "http://cclapp.com/SERVER_APP/_controlesApp/video.php";
  $http.post(link, {}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.videos= [];
      for(var i = 0; i < result.data.length;i++){
        $scope.videos.push({ "imagen"  : result.data[i].foto,"url": result.data[i].url,"fecha":result.data[i].fecha,"nombre":result.data[i].nombre , "vimeo":result.data[i].nombre+","+result.data[i].url});
      }
    }) 
})
.controller('VimeoCtrl', function($scope, $stateParams) {
  console.log($stateParams.Vimeo);
  var vimeo = $stateParams.Vimeo.split(",");
console.log(vimeo)
  $scope.nombre = vimeo[0];
  $scope.vimeo  = vimeo[1];
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('EdificateCtrl', function($scope,$http,$state) {

   var link = 'http://cclapp.com/SERVER_APP/_controlesApp/devocional.php';
   var date = new Date();
   hora=date.getHours();

    //  En estas 4 líneas le decimos que: si la hora de la PC es menor a 12 PM, que muestre el saludo: Buenos Días y a su vez que nos muestre nuestra imagen: dia.jpg . 
    if(hora<12){
      texto="Buenos Días ";  
      imagen_dia="sun.png";
    }

    // Las demás líneas hacen lo mismo: si la hora de la PC es tal, entonces que nos muestre el saludo correspondiente y también su imagen correspondiente. 

    if(hora>=12 && hora<19){
    texto="Buenas Tardes ";
    imagen_dia="sunset.png";
    }

    if(hora>=19 && hora<24){
    texto="Buenas Noches ";
    imagen_dia="moon.png";
    }

  $http.post(link, {dia: date.getDay()}).then(function (result){
    console.log(result);
    var print = result.data;
    console.log(result.data[0].descrip.replace(/\d+/g, "<br>"))
    $scope.edificate = {
      texto       : result.data[0].descrip,
      cita        : result.data[0].cita,
      imagen      : result.data[0].imagen,
      imagen_dia      : imagen_dia,
    }
  });     
})


.controller('ArticulosCtrl', function($scope,$http,$state) {
  var link = 'http://cclapp.com/SERVER_APP/_controlesApp/tipos_articulos.php';
  $http.post(link).then(function (result){
    console.log(result.data.length)
    $scope.items = [];
    for(var i = 0; i < result.data.length;i++){
      $scope.items.push({"id": result.data[i].id,"nombre":result.data[i].nombre,"icono":result.data[i].icono,"badge":result.data[i].badge});
    }
  });   



})
.controller('PredicasCtrl', function($scope, $http,$state) {
   var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/predicas.php';
   $http.post(link3, {}).then(function (result){
    console.log(result);
    $scope.tracks = [];
    for(var i = 0; i < result.data.length;i++){
      $scope.tracks.push({"id": result.data[i].cod,"title":result.data[i].nombre_predica,"artist":result.data[i].predicador,"imagen":result.data[i].imagen});
    }

  });   
  
})
.controller("PredicaAudioCtrl", function($scope,$cordovaMedia,$state, $ionicLoading, MediaManager,$stateParams,$http,$ionicSlideBoxDelegate) {
  var id= $stateParams.TrackId;
  $scope.options = {
    loop: false,
    effect: 'fade',
    speed: 500,
  }
   var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/predica_audio.php';
   $http.post(link3, {predicaId:id}).then(function (result){
    console.log(result);
    $scope.tracks = {
        "title"   :result.data[0].nombre_predica,
        "artist"  :result.data[0].predicador,
        "url"     :result.data[0].mp3
    };
     $scope.gal = [];

    if(result.data[0].foto_album != ""){
        for(var i = 0; i < result.data.length;i++){
            console.log(result.data[i].foto_album)
            $scope.gal.push({"foto":result.data[i].foto_album});
        }
    }else{
          $scope.gal.push({"foto":result.data[0].imagen});
    } 
    

    $scope.dynamicTrack = {};
     $scope.stopPlayback = function() {
        MediaManager.stop();
    };
    $scope.playTrack = function(index) {
        $scope.dynamicTrack = $scope.tracks[index];

        $scope.togglePlayback = !$scope.togglePlayback;    
    };
    
        $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
          // data.slider is the instance of Swiper
          $scope.slider = data.slider;
        });
        $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
          console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
          // note: the indexes are 0-based
          $scope.activeIndex = data.slider.activeIndex;
          $scope.previousIndex = data.slider.previousIndex;
        });
  });
})


.controller("ExampleController", function($scope) {
 
    $scope.submit = function(username) {
 
        alert("Thanks " + username);
 
    }
})

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}