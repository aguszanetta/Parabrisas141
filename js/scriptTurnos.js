$(document).ready(function() {
        var tipoForm ='';
        var evento = '';
        var hoy = new Date();
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'es',
            allDaySlot: false,
            views: {
              dayGridMonth: {
                dayMaxEventRows: 3
              }
            },
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
            noEventsContent: 'No hay turnos',
            //events: turnos,
            events: function(fetchInfo, successCallback, failureCallback) {
                $.ajax({
                  url: 'crudTurnos.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    opcion: 1
                  },
                  beforeSend: function() {
                    $('#loader').removeClass('hidden')
                  },
                  complete: function() {
                      $('#loader').addClass('hidden')
                  },
                  success: function(doc) {
                    var events = [];
                    $(doc).each(function(i) {
                      
                      if(doc[i].estado == 'Finalizado' || doc[i].estado == 'Cancelado'){
                        tipoRender = 'block';
                        colorEstado = (doc[i].estado == 'Finalizado') ? '#d5693b' : '#2c3e50'
                      }else{
                        tipoRender = 'auto';
                        colorEstado = 'primary'
                      }
                      
                      events.push({
                          id: doc[i].idTurno,
                          title: doc[i].contacto,
                          start: doc[i].fechaHora,
                          end: doc[i].fechaHora,
                          tel: '2215754',
                          trabajo: ['Trabajo1','Trabajo 2'],
                          color  : colorEstado,
                          display:tipoRender
                        })            
                    });
                    successCallback(events);
                  }
                });
              }
        });
        calendar.render();

        /*---------- RESET MODAL CUANDO CIERRA ----------*/
        $("#modalTurno").on("hidden.bs.modal", function(){
          $("#formTurno").trigger("reset");
        });

        /*---------- ALTA ----------*/
        calendar.on('dateClick', function(info) {
            tipoForm="alta";
            $(".inputForm").prop("disabled", false);
            $("#fecha").prop("disabled", true);
            $("#btn-editarTurno").css('visibility', 'hidden');
            $("#btn-finalizarTurno").css('visibility', 'hidden');
            $("#btn-eliminarTurno").css('visibility', 'hidden');
            $(".btn-editar").show();
            $("#btn-ok").hide();
            $("#fecha").val(info.dateStr);
            $("#hora").val(hoy.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            $("#modalTurnoHeader").css("background-color", "#d5693b");
            $("#modalTurnoTitle").text("Alta Turnos");
            $("#modalTurno").modal('show');
        });

        /*---------- DETALLE ----------*/
        calendar.on('eventClick', function(event, info) {
          tipoForm="detalle"
          evento = event
          fechaHora = evento.event.startStr.split('T')
          $("#contacto").val(evento.event.title)
          $("#fecha").val(fechaHora[0])
          $("#hora").val(fechaHora[1])

          $(".inputForm").prop("disabled", true);
          $("#btn-editarTurno").css('visibility', 'visible');
          $("#btn-finalizarTurno").css('visibility', 'visible');
          $("#btn-eliminarTurno").css('visibility', 'visible');
          $(".btn-editar").hide();
          $("#btn-ok").show();
          $("#modalTurnoHeader").css("background-color", "#17a2b8");
          $("#modalTurnoTitle").text("Detalle Turno");
          $("#modalTurno").modal('show');
        });

        /*---------- EDITAR ----------*/
        $(document).on("click", "#btn-editarTurno", function(){
          tipoForm="editar"
          $(".inputForm").prop("disabled", false);
          $("#btn-editarTurno").css('visibility', 'hidden');
          $("#btn-finalizarTurno").css('visibility', 'hidden');
          $(".btn-editar").show();
          $("#btn-ok").hide();
          $("#modalTurnoTitle").text("Editar Turno");
          $("#modalTurnoHeader").css("background-color", "#0b5ed7");
        });

        /*---------- FINALIZAR ----------*/
        $(document).on("click", "#btn-finalizarTurno", function(){
          tipoForm="finalziar"
          console.log("ID", evento.event.id )
          Swal.fire({
            title: '¿Seguro?',
            text: '¿Estás seguro que quieres finalizar este turno?',
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 5, idTurno: evento.event.id },
                    success: function() {
                        Swal.fire({
                            title: 'Exito',
                            text: 'El turno se finalizó correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                          }).then( function(){
                            $('#modalTurno').modal('hide');
                            turno = calendar.getEventById(evento.event.id);
                            turno.setProp('display', 'block');
                            turno.setProp('color', '#d5693b');
                            turno.setProp('textColor', 'white')
                        })
                    }
                });
              }
            })
        });

        /*---------- ELIMINAR ----------*/
        $(document).on("click", "#btn-eliminarTurno", function(){
          Swal.fire({
            title: '¿Seguro?',
            text: '¿Estás seguro que quieres eliminar este turno?',
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
          }).then((result) => {
              if (result.isConfirmed) {
                $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { opcion: 4, idTurno: evento.event.id },
                    success: function() {
                        Swal.fire({
                            title: 'Exito',
                            text: 'El turno se eliminó correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                          }).then( function(){
                            $('#modalTurno').modal('hide');
                            evento.event.remove()
                        })
                    }
                });
              }
            })
        })

        /*---------- FORMULARIO ----------*/
        $('#formTurno').submit(function(e){
          e.preventDefault();
          var contacto = $("#contacto").val();
          var fecha = $("#fecha").val();
          var hora = $("#hora").val();
          if(tipoForm == 'alta'){
            $.ajax({
                url: "crudTurnos.php",
                type: "POST",
                datatype: "json",
                data: { fechaHora: fecha+'T'+hora, contacto: contacto, opcion: 2 },
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
                            title: contacto,
                            start: fecha+'T'+hora,
                          });
                    })
                }
            });
          } else if(tipoForm == 'editar'){
            Swal.fire({
              title: '¿Seguro?',
              text: '¿Estás seguro que quieres editar este turno?',
              icon: 'warning',
              showCancelButton: true,
              reverseButtons: true,
              confirmButtonText: 'Confirmar',
              cancelButtonText: 'Cancelar',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                  $.ajax({
                    url: "crudTurnos.php",
                    type: "POST",
                    datatype: "json",
                    data: { 
                      fechaHora: fecha+'T'+hora,
                      contacto: contacto, 
                      opcion: 3, 
                      idTurno: evento.event.id },
                    success: function(data) {
                        Swal.fire({
                            title: 'Exito',
                            text: 'El turno se editó correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500,
                          }).then( function(){
                            $('#modalTurno').modal('hide');
                            turno = calendar.getEventById(evento.event.id)
                            turno.setProp('title', contacto)
                            turno.setStart(fecha+'T'+hora)
                            turno.setExtendedProp('tel', '4859623')
                            turno.setExtendedProp('trabajo', 'Trabajo4')
                        })
                    }
                });
                }
              })
          }
        });

      $("#trabajo").select2({
          theme: "bootstrap-5",
          language: "es",
          closeOnSelect: false,
      });

      $('#trabajo').on('select2:opening select2:closing', function( event ) {
        //var $searchfield = $(this).parent().find('.select2-search__field');
        var $searchfield = $(this).parent().find('.select2-search.select2-search--inline');
        $searchfield.remove()
      });
});