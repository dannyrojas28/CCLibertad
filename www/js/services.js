angular.module('starter.services', [])

.factory('EventsService', function($http) {
  return {
    all: function() {

      // TODO: get events from backend
      var events = [
        {
          'speaker': 'Homer Simpson',
          'title': 'Emprender en servicios web: Compuglobalhipermeganet',
          'place': 'Sala 5',
          'date': '15:00'
        },
        {
          'speaker': 'Stewie Griffin',
          'title': 'Cómo generar ingresos extra siguiendo gordos con una tuba',
          'place': 'Salón de talleres 1',
          'date': '17:00'
        },
        {
          'speaker': 'Ralph Wiggum',
          'title': '¡Corre plátano!',
          'place': 'Sala 5',
          'date': '19:00'
        }
      ];
      return events;
    }
  };
});
