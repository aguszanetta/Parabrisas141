$(document).ready(function() {
        var tipoForm ='';
        var evento = '';
        var hoy = new Date();
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            allDaySlot: false,
            buttonText: {
                today: 'Hoy',
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                listWeek: 'Lista'
            },
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            height: 750,
            timeZone: 'America/Argentina/Buenos_Aires',
            noEventsContent: 'No hay eventos',
            //events: turnos,
            events: function(fetchInfo, successCallback, failureCallback) {
                $.ajax({
                  url: 'crudTurnos.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    opcion: 1
                  },
                  success: function(doc) {
                    console.log(doc)
                    var events = [];
                    $(doc).each(function(i) {
                      events.push({
                        id: doc[i].idTurno,
                        title: doc[i].contacto,
                        start: doc[i].fechaHora
                      })
                    });
                    console.log(events)
                    successCallback(events);
                  }
                });
              }
        });
        calendar.render();

        calendar.on('dateClick', function(info) {
            tipoForm="alta";
            $("#fecha").val(info.dateStr);
            $("#hora").val(hoy.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            $("#modalTurnoHeader").addClass("modalAlta");
            $("#modalTurnoHeader").removeClass("modalEditar");
            $("#modalTurnoTitle").text("Alta Turnos");
            $("#modalTurno").modal('show');
        });

        calendar.on('eventClick', function(event, info) {
            tipoForm="editar"
            evento = event
            //event.title = 'Zane'
            $("#modalTurnoHeader").addClass("modalEditar");
            $("#modalTurnoHeader").removeClass("modalAlta");
            $("#modalTurnoTitle").text("Editar Turno");
            $("#modalTurno").modal('show');
        });

        $('#formTurno').submit(function(e){
            e.preventDefault();
            var nombre = $("#nombre").val();
            var fecha = $("#fecha").val();
            var hora = $("#hora").val();
            if(tipoForm == 'alta'){
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { fechaHora: fecha+'T'+hora, opcion: 2 },
                    success: function(data) {
                        Swal.fire({
                            title: 'Exito',
                            text: 'El turno se cargó correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                          }).then( function(){
                            $('#modalTurno').modal('hide');
                            calendar.addEvent({
                                id: data,
                                title: nombre,
                                start: fecha+'T'+hora,
                              });
                        })
                    }
                });
            } else if(tipoForm == 'editar'){
                console.log("evento", evento.event)
                /*$.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { fechaHora: fecha+'T'+hora, opcion: 3, idTurno: evento.event.id },
                    success: function(data) {
                        Swal.fire({
                            title: 'Exito',
                            text: 'El turno se cargó correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                          }).then( function(){
                            $('#modalTurno').modal('hide');
                            //event = calendar.getEventById(data)
                            //evento.event.setProp('title', 'Zane')
                        })
                    }
                });*/
            }
        });

});