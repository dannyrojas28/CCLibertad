angular.module('starter.controllers', [])

.controller('LoginCtrl', 
	function($scope,  $stateParams, $state, $ionicPopup, $http, $sce, $ionicModal,$ionicLoading,$filter){

    $scope.data = {
      nombres: "danny rojas",
      email:   "rojas@hotmail.com",
      numero:  "3124469080",
      fecha:   "1996-07-28"
    };
    
    var uuid=localStorage.getItem('uuid');
     console.log(uuid);
    if(localStorage.getItem('nameccl') == null){
       //Quitamos la propiedad display none del id del div principal
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

          }
        });
          
    }else{
         //$state.go('list');
    }


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

   

    //obtenemos los datos de los input del formulario
	   $scope.login = {
        nombres : "",
        email : "",
        numero : "",
        fecha_nacimiento : ""
     };

    //funcion para enviar la peticion al servidor
	  $scope.authenticate = function() {
      nombres  = $scope.login.nombres;
      email    = $scope.login.email;
      numero   = $scope.login.numero;
      fecha    = "1996-07-28"; 

	  	console.log( nombres+" - "+email+" - "+numero+" - "+fecha)
	    var link = 'http://cclapp.com/SERVER_APP/_controlesApp/reg-usuarios.php';
 
        $http.post(link, {nombre: nombres,email : email,cel : numero,fecha : fecha,uuid: uuid}).then(function (res){
        	console.log(res);
          $scope.hide();
        	/*var print = JSON.parse(res);
            if(print[0]['mensaje'] == '1'){
                $state.go('app.activity');  
            }else{
                var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: 'Por favor verifique la información!'
                });
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

	}
)

.controller('ListCtrl', function($scope, EventsService) {
  $scope.events = EventsService.all();
})

.controller('AccountCtrl', function($scope) {
  $scope.logout = function() {
    console.log('TODO: logout');
  };
})


.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  // Called to navigate to the main app
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
})

