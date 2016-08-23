angular.module('starter.controllers', ['ionic', 'ngCordova','ionic-audio'])
.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
 
})



.controller('IntroCtrl', function($ionicPlatform,$scope, $state, $ionicSlideBoxDelegate,  $stateParams,$ionicPopup, $http, $sce, $ionicModal,$ionicLoading,$filter,$cordovaDevice) {
  // Called to navigate to the main app
// localStorage.removeItem('nameccl');
      $('#Intro').css('display','block');
 
var uuid = 2324;
      console.log("intro")
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
                //localStorage.setItem('nameccl',pr.name);
                //localStorage.setItem('emailccl',pr.email);
                //localStorage.setItem('celccl',pr.celular);
                //localStorage.setItem('fechaccl',pr.fecha);
                  //$state.go('list');
                  $scope.login = {
                    nombres :  pr.name,
                    email   :  pr.email,
                    numero  :  pr.celular,
                    fecha   :  "",
                    fechaD  :  "",
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
                      fechaD  : "",
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
          state    = $scope.login.state;
          var fecha = $('#fecha').val();
          console.log( nombres+" - "+email+" - "+numero+" - "+fecha+" - "+state)
          var link = 'http://cclapp.com/SERVER_APP/_controlesApp/reg-usuarios.php';
     
            $http.post(link, {nombre: nombres,email : email,cel : numero,fecha : fecha,uuid: uuid,estado:state}).then(function (data){
              console.log(data);
              var pr=data.data;
              $scope.hide();
              if(pr.state == 1){
              	localStorage.setItem('nameccl',nombres);
                localStorage.setItem('emailccl',email);
                localStorage.setItem('celccl', numero);
                localStorage.setItem('fechaccl',fecha);
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




.controller('InicioCtrl', function($scope, $http,$state,$ionicLoading, $compile,$sce) {
  if(localStorage.getItem('nameccl') == null){
    $state.go('intro');
  }
 
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
   var link4 = "http://cclapp.com/SERVER_APP/_controlesApp/video.php";
  $http.post(link4, {}).then(function (result){
    console.log(result.data[0].url);
    var print = result.data;
        $scope.videos = {
         "imagen"  : result.data[0].foto,
         "url"     : "https://player.vimeo.com/video/"+result.data[0].url+"?color=c9ff23&title=0&byline=0&portrait=0",
         "fecha"   : result.data[0].fecha,
         "nombre"  : result.data[0].nombre
      }
     $scope.movie = {src:"https://player.vimeo.com/video/"+result.data[0].url+"?color=c9ff23&title=0&byline=0&portrait=0", title:result.data[0].nombre};
  });

  $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
  }
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
    //peticiones      
    $scope.peticion = [
        { 
              tipo: "Espiritual",
              imagen: "p_espiritual.jpg" 
        },
        { 
              tipo: "Familiar",
              imagen: "p_familiar.jpg" 
        },
        { 
              tipo: "Material",
              imagen: "p_material.jpg" 
        }
    ];
    var a = Math.round(Math.random()*2);
    $scope.peticions = {
      tipo   :  $scope.peticion[a].tipo,
      imagen :  $scope.peticion[a].imagen
    }

     //consejos     
    $scope.consejo = [
        { 
              tipo: "Economico",
              imagen: "c_economico.jpg" 
        },
        { 
              tipo: "de Jovenes",
              imagen: "c_jovenes.jpg" 
        },
        { 
              tipo: "de Parejas",
              imagen: "c_parejas.jpeg" 
        },
        { 
              tipo: "Personal",
              imagen: "c_personal.jpg" 
        }
    ];
    var a = Math.round(Math.random()*3);
    $scope.consejos = {
      tipo   :  $scope.consejo[a].tipo,
      imagen :  $scope.consejo[a].imagen
    }
  var link5 = 'http://cclapp.com/SERVER_APP/_controlesApp/actividades_hoy.php';
      $http.post(link5, {}).then(function (result){
          $scope.actividades= [];
           console.log(result.data[0].nombre);
            if( result.data[0].nombre != false){
              for(var i = 0; i < result.data.length;i++){
                 $scope.actividades.push({ "descrip"  : result.data[i].nombre+" - "+result.data[i].hora});
              }
            }else{
              $('#list-acti').css("display","none");
            }
  });
  var link6 = 'http://cclapp.com/SERVER_APP/_controlesApp/articulo_hoy.php';
  $http.post(link6).then(function (result){
    console.log("resullllll"+result)
    if (result.data[0].titulo != false) {
      $('#articulo').css('display','block');
      console.log("EL ID DEL ARTICULO"+ result.data[0].id);
       $scope.articulo = {
        titulo       : result.data[0].titulo+" - Parte "+result.data[0].dia,
        id        : result.data[0].id,
        imagen      : result.data[0].imagen
      }
    }else{
      $('#articulo').css('display','none');
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
      id          : result.data[0].cod,
      imagen      : result.data[0].imagen,
      predicador  : result.data[0].predicador,
      nombre      : result.data[0].nombre_predica
    }

  });   
   var link5 = 'http://cclapp.com/SERVER_APP/_controlesApp/cumpleanos.php';
    $http.post(link5, {}).then(function (result){
      console.log(result);
      $scope.cumples= [];
      if( result.data[0].nombre != "false"){
        for(var i = 0; i < result.data.length;i++){
           $scope.cumples.push({ "nombre"  : result.data[i].nombre});
        }
      }else{
        $('#list-cumple').css("display","none");
      }
    })
  
})

.controller('TabCtrl', function($scope,$ionicSideMenuDelegate) {
  $scope.toggleMenu = function() {

            $ionicSideMenuDelegate.toggleRight(false);
        if($ionicSideMenuDelegate.isOpenRight()) {
            $ionicSideMenuDelegate.toggleRight(false);
        } else {
            $ionicSideMenuDelegate.toggleRight(true);
        }
    }
   $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
})
.controller('TabGrupoCtrl', function($scope, $ionicModal) {
 $ionicModal.fromTemplateUrl('templates/modal-grupos.html', {
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
})
.controller('AppCtrl', function($scope){

})

.controller('GruposCtrl', function($scope, $ionicLoading, $compile,$http,$cordovaGeolocation) {
        $scope.loading = $ionicLoading.show({
          content: 'Geoloca...',
          showBackdrop: false
        });
        var posOptions = { 
             enableHighAccuracy:false,
            timeout: 50000
        };
        var pri =  false;
      $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
            var lat  = position.coords.latitude
            var long = position.coords.longitude
          }, function(err) {
            // error
          // alert("No podemos acceder a tu Ubicación");
            $scope.loading = $ionicLoading.hide({});
          });


      var watchOptions = {
          enableHighAccuracy: false,
            timeout: 50000
      };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function(err) {
        // error
          //    alert("No podemos acceder a tu Ubicación");
            $scope.loading = $ionicLoading.hide({});
      },
      function(position) {
        lat  = position.coords.latitude;
        long = position.coords.longitude;

        localStorage.setItem('lat',lat);
        localStorage.setItem('long',long);
        console.log(lat,long);

        if(pri == false){
          pri=true;
          $scope.loading = $ionicLoading.hide({});
            var myLatlng = new google.maps.LatLng(lat, long);
            
            var mapOptions = {
              center: myLatlng,
              zoom: 16,
              zoomControl:false,
              mapTypeControl:true,
              scaleControl:false,
              streetViewControl:true,
               rotateControl:true,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);
            
          
            //MARKER DE MI UBICACION
            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: 'Mi Ubicación',
              icon: 'img/icono-user.png'
            });

            //MARKER + INFOWINDOW CC PINOS
            var contentStringP = "<div><img src='img/pjose.png' style='width:100%'><br><center><a style='color:#4A7648;font-size:16px;'>Ver Mas de nosotros</a></center></div>";;
            var compiledP = $compile(contentStringP)($scope);

            var infowindowP = new google.maps.InfoWindow({
              content: compiledP[0]
            });
            var markerP = new google.maps.Marker({
              position: new google.maps.LatLng(7.903106, -72.493393),
              map: map,
              title: 'CC Pinos',
              icon: 'img/asa.png'
            });

            google.maps.event.addListener(markerP, 'click', function() {
              infowindowP.open(map,markerP);
            });

           //Marker + infowindow + angularjs compiled ng-click  CC LIBERTAD
            var contentStringL = "<div><img src='img/liber.png' style='width:100%'><br><center><a style='color:#4A7648;font-size:16px;'>Ver Mas de nosotros</a></center></div>";
            var compiledL = $compile(contentStringL)($scope);

            var infowindowL = new google.maps.InfoWindow({
              content: compiledL[0]
            });
            var markerL = new google.maps.Marker({
              position: new google.maps.LatLng(7.888210,-72.477557),
              map: map,
              title: 'CC Libertad',
              icon: 'img/asa.png'
            });


            
            google.maps.event.addListener(markerL, 'click', function() {
              infowindowL.open(map,markerL);
            });
            //peticion al servidor para mostrar todos los grupos de conexion
              var link = "http://cclapp.com/SERVER_APP/_controlesApp/puntos.php";
              $http.post(link, {}).then(function (result){
                console.log(result);
                var print = result.data;
                var infowindowG = new google.maps.InfoWindow({content: ''});
                for(var i = 0; i < result.data.length;i++){
                    if(print[i].tipo == 2){
                          //Marker + infowindow + angularjs compiled ng-click  CC LIBERTAD
                          var markerG = new google.maps.Marker({
                            position: new google.maps.LatLng(print[i].latitud,print[i].longitud),
                            map: map,
                            title: print[i].lider,
                            icon: 'img/casa_icon2.png'
                          }); 
                           var contentStringG = "<div class='list'><center><h5>Grupo de Conexion</h5></center> <a class='item item-thumbnail-left' href='#/grupo/"+print[i].cod+"'><img src='http://cclapp.com/imagenes_lideres/"+print[i].imagen+"' style='width:100px;height:90px;'><h2>"+print[i].lider+"</h2><p>"+print[i].direccion+"</p><p>Ver Mas..</p></a></div>";
                           
                          (function(markerG,contentStringG) {            
                            google.maps.event.addListener(markerG, 'click', function() {
                              infowindowG.setContent(contentStringG);
                              infowindowG.open(map,markerG);
                            });
                          })(markerG,contentStringG);
                    }
                }
              });
            $scope.map = map;

        }
    });
     
      
      $scope.clickTest = function() {
       // alert('Example of infowindow with ng-click')
      };
      
})

.controller('ListaGruposCtrl', function($scope,   $ionicLoading,$http){
  
    var link = "http://cclapp.com/SERVER_APP/_controlesApp/puntos.php";
      $http.post(link, {}).then(function (result){
          $scope.groups = [];
          console.log(result);
          var ing=0;
          var pos = 0;
          var print = result.data;
          for (var i=0;i < print.length; i++) {
              if (print[i].tipo == 1) {
                 pos = ing;
                  $scope.groups[pos] = {
                  name: print[i].lider,
                  imagen : print[i].imagen,
                  direccion : print[i].direccion,
                  items: [],
                  show: false
                };
                ing = parseInt(ing) + 1;
              }else{
                $scope.groups[pos].items.push({"entrenador":print[i].lider,"imagen":print[i].imagen,"direccion":print[i].direccion,'id':print[i].cod});
              }
          }
      });
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };
})


.controller('SearchGruposCtrl', function($scope){

})


.controller('GrupoDetailCtrl', function($scope,$stateParams,$http,$cordovaGeolocation){
  var id = $stateParams.ItemId;
  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/puntos.php';
    $http.post(link2, {id:id}).then(function (result){
      document.getElementById("map2").innerHTML = "";
      console.log(result);
      var print = result.data;
      $scope.grupo = {
        imagen      : print[0].imagen,
        nombre      : print[0].lider,
        hora        : print[0].hora,
        celular     : print[0].celular,
        direccion   : print[0].direccion
      }

      var markerG;
     
      lat   = parseFloat(localStorage.getItem('lat'));
      long  = parseFloat(localStorage.getItem('long'));

      latD= parseFloat(print[0].latitud);
      lonD= parseFloat(print[0].longitud);

      console.log("mi punto "+lat,long)
      console.log("grupo    "+latD,lonD);

      myLatlng = new google.maps.LatLng(lat, long);
                 mapOptions = {
                            center: myLatlng,
                            zoom: 16,
                            zoomControl:false,
                            mapTypeControl:true,
                            scaleControl:false,
                            streetViewControl:true,
                             rotateControl:true,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                          };
                           map = new google.maps.Map(document.getElementById("map2"),
                              mapOptions);
                            directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                          }); 
                        console.log('2ls')
                          //MARKER DE MI UBICACION
                           marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: 'Mi Ubicación',
                            icon: 'img/icono-user.png'
                          });

                          markerG = {lat: latD, lng: lonD};
                          markerG = new google.maps.Marker({
                            position: new google.maps.LatLng(latD,lonD),
                            map: map,
                            title: print[0].lider,
                            icon: 'img/casa_icon2.png'
                          }); 
                          request = {
                           destination: {lat: latD, lng: lonD},
                            origin: {lat: lat, lng: long},
                            travelMode: 'DRIVING'
                          };
                          directionsService = new google.maps.DirectionsService();
                          directionsService.route(request, function(response, status) {
                            if (status == 'OK') {
                              // Display the route on the map.
                              directionsDisplay.setOptions( 
                                                        { 
                                                          suppressMarkers: true,
                                                          polylineOptions: {
                                                            strokeWeight: 4,
                                                            strokeOpacity: 1,
                                                            strokeColor:  '#4A7648' 
                                                          }
                                                         } 
                              );
                              directionsDisplay.setDirections(response);
                            }
                          }); 
       var posOptions = { 
             enableHighAccuracy:false,
            timeout: 50000
        };

        var prid =  false;
          $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude
              }, function(err) {
                // error
               // alert("No podemos acceder a tu Ubicación");
              });


          var watchOptions = {
              enableHighAccuracy: false,
                timeout: 50000
          };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
          null,
          function(err) {
            // error
               // alert("No podemos acceder a tu Ubicación");
          },
          function(position) {
            console.log("3")
            if(prid == false){
              prid=true;
                lat  = position.coords.latitude;
                long = position.coords.longitude;
                console.log(lat,long)
                localStorage.removeItem('lat');
                localStorage.removeItem('long');
                localStorage.setItem('lat',lat);
                localStorage.setItem('long',long);
                 
                 markerG.setMap(null); 
            }
          });
    })

    $scope.sd = function() {
      //alert(23)
      window.location="#/tabGrup/gruposL";
    }
})


.controller('MediaCtrl', function($scope,$ionicLoading, $ionicModal,$state,$http) {
    $scope.loading = $ionicLoading.show({
      content: 'Geoloca...',
      showBackdrop: false
    });
  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/album.php';
  $http.post(link2, {}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.items = [];
    for(var i = 0; i < result.data.length;i++){
      console.log(result.data[i].nombre)
      $scope.items.push({ "imagen"  : result.data[i].url, "nombre"  : result.data[i].nombre, "id"  : result.data[i].id});
      }
      $scope.loading = $ionicLoading.hide({});
    }) 
})

.controller('AlbumCtrl',function($scope, $stateParams,$http,  $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
  var link2 = 'http://cclapp.com/SERVER_APP/_controlesApp/fotos.php';
  $http.post(link2, {id:$stateParams.ItemId}).then(function (result){
    console.log(result);
    var print = result.data;
    $scope.albums = [];
    console.log( result.data[1].url)
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
.controller('VimeoCtrl', function($scope, $stateParams,$sce) {
  console.log($stateParams.Vimeo);
  var vimeo = $stateParams.Vimeo.split(",");
  console.log(vimeo)
  $scope.nombre = vimeo[0];
  $scope.vimeo  = "https://player.vimeo.com/video/"+vimeo[1]+"?color=c9ff23&title=0&byline=0&portrait=0";
   $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
  }
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
  var link6 = 'http://cclapp.com/SERVER_APP/_controlesApp/articulo_hoy.php';
  $http.post(link6).then(function (result){
    if (result.data[0].titulo != false) {
      $('#articulo').css('display','block');
       $scope.articulo = {
        titulo       : result.data[0].titulo+" - Parte "+result.data[0].dia,
        id        : result.data[0].id,
        imagen      : result.data[0].imagen
      }
    }else{
      $('#articulo').css('display','none');
    }
  });
  var link = 'http://cclapp.com/SERVER_APP/_controlesApp/tipos_articulos.php';
  $http.post(link).then(function (result){
    console.log(result.data.length)
    $scope.items = [];
    for(var i = 0; i < result.data.length;i++){
      $scope.items.push({"id": result.data[i].id,"nombre":result.data[i].nombre,"icono":result.data[i].icono,"badge":result.data[i].badge});
    }
  });   
})
.controller('ArticuloTiposCtrl', function($scope,$http,$state,$stateParams) {
    var id=$stateParams.Id;
    var link = 'http://cclapp.com/SERVER_APP/_controlesApp/articulo_id.php';
    $scope.articulos = [];
     $http.post(link, {id:id}).then(function (result){
      $scope.ar = {articulo :result.data[0].articulo};
      console.log(result.data[0].titulo != false)
        if(result.data[0].titulo != false){
            for(var i = 0; i < result.data.length;i++){
             $scope.articulos.push({"id": result.data[i].id,"titulo":result.data[i].titulo,"imagen":result.data[i].imagen,'fecha':result.data[i].fecha});
            }
        }else{
           $('#cont').html('<center><ion-item  item="item"  style="margin-top:30px">No hay Articulos para esta seccion</ion-item></center>');
        }
       
    })
})
.controller('ArticuloInfoCtrl', function($scope,$http,$state,$stateParams) {
    var id=$stateParams.Id;
    var link = 'http://cclapp.com/SERVER_APP/_controlesApp/articulo_info.php';
    $scope.btnTexts = [];
     $http.post(link, {id:id}).then(function (result){
      console.log(result.data)
      $scope.articulo = {
          nombre :result.data[0].titulo,
          id     :result.data[0].id,
          imagen :result.data[0].imagen,
          fecha  :result.data[0].fecha,
          num_dias: result.data.length
      };
       for(var i = 0; i < result.data.length;i++){
             $scope.btnTexts.push({"texto": result.data[i].texto,'fecha':result.data[i].fecha_publicacion,'dia':result.data[i].dia});
      }
       
    })

    $scope.Texto = function(num){
        $('.divTexto').css('display','none');
        $('#div'+num).css('display','block');
    }
})
.controller('PredicasCtrl', function($scope, $http,$state,$ionicLoading) {
    $scope.loading = $ionicLoading.show({
      content: 'Geoloca...',
      showBackdrop: false
    });
   var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/predicas.php';
   $http.post(link3, {}).then(function (result){
    console.log(result);
    $scope.tracks = [];
    for(var i = 0; i < result.data.length;i++){
      $scope.tracks.push({"id": result.data[i].cod,"title":result.data[i].nombre_predica,"artist":result.data[i].predicador,"imagen":result.data[i].imagen});
    }
      $scope.loading = $ionicLoading.hide({});
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
    $scope.tracks = [{
        "title"   :result.data[0].nombre_predica,
        "artist"  :result.data[0].predicador,
        "url"     :result.data[0].mp3
    }];
     $scope.gal = [];
    PredicaFo = result.data[0].foto_album;
    if(result.data[0].foto_album != ""){
        for(var i = 0; i < result.data.length;i++){
            console.log(result.data[i].foto_album)
            $scope.gal.push({"foto":result.data[i].foto_album});
        }
    }else{
          $scope.gal.push({"foto":result.data[0].imagen});
    } 
    
    $scope.Burbuja = function(){
        if(localStorage.getItem('PredicaId') == null){
          $('#btn-predicas').css('display','block');
        }else{
           $('#btn-predicas').css('display','none');
        }
        localStorage.setItem('PredicaId',id);
        localStorage.setItem('PredicaFo',PredicaFo);
        $('#btn-predicas').css('background','url('+PredicaFo+')');
        $('#btn-predicas').css('background-size','100% 80%');
        $('#btn-predicas').css('background-position','100%');
        $("#btn-predicas").prop("href", "#/predica/"+id);
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

.controller("IglesiaCtrl", function($scope, $cordovaGeolocation,$ionicSlideBoxDelegate){
    
    $scope.gal = [{"foto": "https://c6.staticflickr.com/8/7712/26491811853_4ba991c689_c.jpg"},
      {"foto": "https://c8.staticflickr.com/2/1444/26121671255_f4d0d14e3f_c.jpg"},
      {"foto": "https://c8.staticflickr.com/2/1543/24836593799_8dd362171f_c.jpg"},
      {"foto": "https://c1.staticflickr.com/8/7487/27908515736_10fdc08d31_c.jpg"},
      {"foto": "https://c8.staticflickr.com/8/7755/28333214135_e3a656d88b_c.jpg"}];
    
    
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
 
       var posOptions = { 
             enableHighAccuracy:false,
            timeout: 50000
        };

        var pridd =  false;
          $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude
              }, function(err) {
                // error
               // alert("No podemos acceder a tu Ubicación");
              });


          var watchOptions = {
              enableHighAccuracy: false,
                timeout: 50000
          };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
          null,
          function(err) {
            // error
               // alert("No podemos acceder a tu Ubicación");
          },
          function(position) {
            console.log("3")
            if(pridd == false){
              pridd=true;
                lat  =  parseFloat(position.coords.latitude);
                long =  parseFloat(position.coords.longitude);
               latD  =  parseFloat("7.888210");
               lonD  =  parseFloat("-72.477557");
                myLatlng = new google.maps.LatLng(lat, long);
                 mapOptions = { 
                            center: myLatlng,
                            zoom: 16,
                            zoomControl:false,
                            mapTypeControl:true,
                            scaleControl:false,
                            streetViewControl:true,
                             rotateControl:true,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                          };

                           map = new google.maps.Map(document.getElementById("map4"),
                              mapOptions);
                            directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                          }); 
                        console.log('2ls')
                          //MARKER DE MI UBICACION
                           marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map,
                            title: 'Mi Ubicación',
                            icon: 'img/icono-user.png'
                          });

                          markerG = {lat: latD, lng: lonD};
                          markerG = new google.maps.Marker({
                            position: new google.maps.LatLng(latD,lonD),
                            map: map,
                            title: 'CC Libertad',
                            icon: 'img/asa.png'
                          }); 
                          request = {
                           destination: {lat: latD, lng: lonD},
                            origin: {lat: lat, lng: long},
                            travelMode: 'DRIVING'
                          };
                          directionsService = new google.maps.DirectionsService();
                          directionsService.route(request, function(response, status) {
                            if (status == 'OK') {
                              // Display the route on the map.
                              directionsDisplay.setOptions( 
                                                        { 
                                                          suppressMarkers: true,
                                                          polylineOptions: {
                                                            strokeWeight: 4,
                                                            strokeOpacity: 1,
                                                            strokeColor:  '#4A7648' 
                                                          }
                                                         } 
                              );
                              directionsDisplay.setDirections(response);
                            }
                          }); 
            }
          });
    

    $scope.sd = function() {
      //alert(23)
      window.location="#/tabGrup/gruposL";
    }

})

.controller("AcercaCtrl", function($scope) {
})
.controller("DepartamentosCtrl", function($scope,$http,$ionicModal) {
    var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/dptos.php';
    $http.post(link3, {}).then(function (result){
      console.log(result);
      $scope.dptos= [];
      for(var i = 0; i < result.data.length;i++){
        $scope.dptos.push({ "id"  : result.data[i].id,"departamento": result.data[i].nombre,"icono":result.data[i].icono});
      }
    })
     $ionicModal.fromTemplateUrl('templates/modal-dptoinfo.html', {
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
})
.controller("DptoCtrl", function($scope,$http,$stateParams, $ionicModal,$ionicLoading,$ionicPopup,$state) {
    var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/dptos.php';
    console.log($stateParams.ItemId)
    $http.post(link3, {id : $stateParams.ItemId}).then(function (result){
      console.log(result);
      var f=result.data[0].nombre;
        $scope.dptos= {
          "nombre": result.data[0].nombre,
          "url": result.data[0].url_video,
          "descripcion": result.data[0].descripcion,
          "lider": result.data[0].lider,
          "miembros": result.data[0].miembros,
          "contactos": result.data[0].contactos
        };
        $scope.formu = {
          nombres :  localStorage.getItem('nameccl'),
          email   :  localStorage.getItem('emailccl'),
          numero  :  localStorage.getItem('celccl'),
          direccion : "",
          concepto  : "",
          dpto : f
        };
    })
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
          nombres   = $scope.formu.nombres;
          email     = $scope.formu.email,
          numero    = $scope.formu.numero,
          direccion = $scope.formu.direccion,
          concepto  = $scope.formu.concepto,
          dpto      = $scope.formu.dpto
     
          var link = 'http://cclapp.com/SERVER_APP/_controlesApp/nuevos_integrantes.php';
          console.log(nombres,email,numero,direccion,concepto,dpto)
          $http.post(link, {nombre: nombres,email : email,numero : numero,direccion : direccion,concepto: concepto,dpto:dpto}).then(function (data){
            $scope.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                      title: 'Bienvenido',
                      template:"En las proximas horas te llamaremos para acordar una cita. “Quien quiera ser grande deberá convertirse en un siervo”. Marcos 10:43.",
                       buttons: [
                            {
                              text: 'Gracias',
                              type: 'button-positive',
                              onTap:function(e) {
                                  $state.go('tab.departamentos');
                                   $scope.closeModal();
                                }
                            }
                        ]   
              });
          });
      
      };
      $ionicModal.fromTemplateUrl('templates/modal-dptos.html', {
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
})
.controller("CumpleanosCtrl", function($scope,$http) {
  var link3 = 'http://cclapp.com/SERVER_APP/_controlesApp/cumpleanos.php';
    $http.post(link3, {}).then(function (result){
      console.log(result);
      $scope.cumples= [];
      if( result.data[0].nombre != "false"){
        for(var i = 0; i < result.data.length;i++){
           $scope.cumples.push({ "nombre"  : result.data[i].nombre});
        }
      }else{
        $('#list').html("<br><center><h5>En este dia ningun amigo esta de cumpleaños.</h5></center>");
      }
    })
})

.controller('ActividadesCtrl', function($scope,$http){

     var link = 'http://cclapp.com/SERVER_APP/_controlesApp/actividades_hoy.php';
      $http.post(link, {}).then(function (result){
          $scope.actividades= [];
           console.log(result.data[0].nombre);
            if( result.data[0].nombre != false){
              for(var i = 0; i < result.data.length;i++){
                 $scope.actividades.push({ "nombre"  : result.data[i].nombre,"hora":result.data[i].hora,"imagen":result.data[i].imagen});
              }
            }else{
              $('#actividades').html("<br><center><h5>En este día no tenemos ninguna Actividad</h5></center>");
            }
         
      });
})
.controller('TodasActividadesCtrl', function($scope,$http){
        var link = 'http://cclapp.com/SERVER_APP/_controlesApp/actividades_mes.php';
      $http.post(link, {}).then(function (result){
        console.log(result)
          $scope.actividades= [];
           console.log(result.data[1][0][0].nombre);
            if( result.data[0].nombre != false){
              for(var i = 0; i < result.data.length;i++){
                console.log(result.data[i][0].length)
                  $scope.actividades[i] = {
                    fecha : result.data[i][0][0].fecha,
                    items: []
                  };
                  for(var k = 0;k < result.data[i][0].length;k++){
                      $scope.actividades[i].items.push({ "descrip"  : result.data[i][0][k].nombre+" "+result.data[i][0][k].hora});
                  }
              }
            }else{
              $('#actividades').html("<br><center><h5>En este día no tenemos ninguna Actividad</h5></center>");
            }
      });
})
.controller("PeticionCtrl", function($scope,$http,$ionicPopup,$state, $ionicLoading) {
  $scope.formu = {
    tipo : "",
    peticion : ""
  }
   //funcion para enviar la peticion al servidor
      $scope.authenticate = function() {
          tipo         = $scope.formu.tipo;
          peticion     = $scope.formu.peticion
     
          var link = 'http://cclapp.com/SERVER_APP/_controlesApp/peticion.php';
          $http.post(link, {tipo: tipo, peticion : peticion}).then(function (data){
            $scope.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                      title: 'Bendiciones '+localStorage.getItem('nameccl'),
                      template:"Hemos recibido tu petición, ten Fé y espera la respuesta de Dios. “Nadie te podrá hacer frente en todos los días de tu vida; como estuve con Moisés, estaré contigo; no te dejaré, ni te desampararé.” Josué 1:5.",
                       buttons: [
                            {
                              text: 'Lo Creo',
                              type: 'button-positive',
                              onTap:function(e) {
                                  $scope.formu = {
                                      tipo : "",
                                      peticion : ""
                                    }
                                    $state.go('tab.peticion');
                                }
                            }
                        ]   
              });
          });
      
      };
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
})
.controller("ConsejoCtrl", function($scope,$http,$ionicPopup,$state, $ionicLoading) {
       $scope.formu = {
          nombres :  localStorage.getItem('nameccl'),
          email   :  localStorage.getItem('emailccl'),
          numero  :  localStorage.getItem('celccl'),
          tipo : ""
        };
   //funcion para enviar la peticion al servidor
      $scope.authenticate = function() {
          nombres      = $scope.formu.nombres;
          email        = $scope.formu.email;
          numero       = $scope.formu.numero;
          tipo         = $scope.formu.tipo;
     
          var link = 'http://cclapp.com/SERVER_APP/_controlesApp/consejo.php';
          console.log(tipo,nombres,email,numero)
          $http.post(link, {tipo: tipo, nombres:nombres,email:email,numero:numero}).then(function (data){
            $scope.hide();
            console.log(data);
              var alertPopup = $ionicPopup.alert({
                      title: 'Bendiciones '+localStorage.getItem('nameccl'),
                      template:"Pronto te llamaremos para agendar una cita, Recuerda.<br> “Escucha el consejo y acepta la corrección, para que seas sabio el resto de tus días.” Proverbios 19:20",
                       buttons: [
                            {
                              text: 'Gracias',
                              type: 'button-positive',
                              onTap:function(e) {
                                 $scope.formu = {
                                    nombres :  localStorage.getItem('nameccl'),
                                    email   :  localStorage.getItem('emailccl'),
                                    numero  :  localStorage.getItem('celccl'),
                                    tipo : ""
                                  };
                                    $state.go('tab.consejo');
                                }
                            }
                        ]   
              });
          });
      
      };
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
 
})

.controller("ExampleController", function($scope) {
})

var lat,long;

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}