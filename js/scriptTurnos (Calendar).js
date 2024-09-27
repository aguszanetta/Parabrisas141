
$(document).ready(function() {
  window.jsPDF = window.jspdf.jsPDF;
  //import jsPDF from './';
  //import { jsPDF } from "jspdf";
  //import autoTable from 'jspdf-autotable'
  //window.jspdf.autotable = window.jspdf.autotable.jspdf.autotable; 
  var tipoForm ='';
  var evento = '';
  var hoy = new Date();
  arrayCristales = [];
  arrayCristal = [];
  //arrayStock = [];
  cristalesAPedir = [];
  var cantidadStock = 0;
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      allDaySlot: false,
      customButtons: {
        btnCaja: {
          icon: 'caja',
          click: async function() {
            mesActual = hoy.getMonth()+1;
            $("#mes").val(mesActual)
            await cajaMes(mesActual);
            $("#modalCaja").modal('show')
          }
        },
        btnExportarTurnos: {
          icon: 'exportarTurnos',
          click: async function() {
            exportarPDF(calendar);
          }
        }
      },
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
          left: 'prev,next today btnCaja btnExportarTurnos',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      height: 750,
      timeZone: 'local',
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
                
                if(doc[i].estado == 'Finalizado'){
                  tipoRender = 'block';
                  colorEstado = '#d5693b';
                }else{
                  tipoRender = 'auto';
                  colorEstado = 'primary';
                }

                events.push({
                    id: doc[i].idTurno,
                    title: doc[i].contacto,
                    start: doc[i].fecha,
                    color: colorEstado,
                    display: tipoRender
                  })            
              });
              successCallback(events);
            }
          });
        }
  });
  calendar.render();
  $(".fc-icon-caja").html('<i class="fa-solid fa-cash-register"></i>');
  $(".fc-icon-exportarTurnos").html('<i class="fa-solid fa-file-pdf"></i>');
  
  if(calendar.view.type == "dayGridMonth"){
    $(".fc-btnExportarTurnos-button").hide();
  }

  $(document).on("click", ".fc-timeGridDay-button", function(){
    $(".fc-btnExportarTurnos-button").hide();
  })

  $(document).on("click", ".fc-dayGridMonth-button", function(){
    $(".fc-btnExportarTurnos-button").hide();
  })

  $(document).on("click", ".fc-listWeek-button", function(){
    $(".fc-btnExportarTurnos-button").show();
  })

  $(document).on("click", ".fc-timeGridWeek-button", function(){
    $(".fc-btnExportarTurnos-button").show();
  })

  /*---------- RESET MODAL CUANDO CIERRA ----------*/
  $("#modalTurno").on("hidden.bs.modal", function(){
    $("#formTurno").trigger("reset");
    $("#empresa").val("");
    tablaCristales.clear().draw();
    $("#cristales").attr('value', '');
    $("#banderaCristales").attr('value', '');
    $("#banderaTrabajos").attr('value', '');
    $("#modelo").html("<option value=''>Modelo</option>");
    $("#cristal").html("<option value=''>Cristal</option>");
    //$("#rowArchivos").children().not("#wrapperArchivo").remove();
    $("#contentArchivos").empty();
    $("#alertaCristal").hide();
  });

  /*---------- CAJA ----------*/
  $(document).on("change","#mes", function(){
    cajaMes($("option:selected", this).val())
  })
  /*---------- ALTA ----------*/
  calendar.on('dateClick', function(info) {
      tipoForm="alta";
      $(".inputForm").prop("disabled", false);
      $("#fecha").prop("disabled", true);
      $('#trabajo').val(null).trigger('change');
      $("#btn-editarTurno").css('visibility', 'hidden');
      $("#btn-finalizarTurno").css('visibility', 'hidden');
      $("#btn-eliminarTurno").css('visibility', 'hidden');
      $(".btn-editar").show();
      $("#btn-ok").hide();
      $(".select2-search.select2-search--inline").remove();
      $("#fecha").val(info.dateStr);
      $("#hora").val(0)
      $("#modalTurnoHeader").css("background-color", "#d5693b");
      $("#modalTurnoTitle").text("Alta Turnos");
      $("#modalTurno").modal('show');
  });

  /*---------- DETALLE ----------*/
  calendar.on('eventClick', function(event, info) {
    tipoForm="detalle"
    evento = event
    $.ajax({
      type: "POST",
      url: 'crudTurnos.php',
      datatype:"json",
      data: {
          opcion: 6,
          idTurno: evento.event.id
      },
      beforeSend: function() {
          $('#loader').removeClass('hidden')
      },
      complete: function() {
          $('#loader').addClass('hidden')
      },
      success: function(data) {
        datos = JSON.parse(data)
        fecha = evento.event.startStr.split('T');
        $("#contacto").val(evento.event.title);
        $("#fecha").val(fecha[0]);
        if(datos[0][0].hora == "Mañana"){
          $("#hora").val(1);
        }else{
          $("#hora").val(2);
        }
        $("#telefono").val(datos[0][0].telefono);
        $("#dominio").val(datos[0][0].dominio);
        $("#empresa").val(datos[0][0].empresaID);
        $("#marca").val(datos[0][0].marcaID);
        $("#importeTrabajo").val(datos[0][0].importeTrabajo);
        $("#observacion").val(datos[0][0].observacion);
        $("#numFactura").val(datos[0][0].numFactura);
        $("#siniestro").val(datos[0][0].siniestro);

        //CARGAR DESPLEGABLE MODELO
        for (let i = 0; i < datos[4].length; i++) {
          $("#modelo").append($('<option>', {value: datos[4][i].idModelo, text: datos[4][i].nombre}));
        }
        $("#modelo").val(datos[0][0].idModelo);

        //CARGAR DESPLEGABLE CRISTAL
        idCristal = datos[0][0].idCristales.split(',')
        codigos = datos[0][0].codigos.split(',')
        descripciones = datos[0][0].descripciones.split(',')
        for (let i = 0; i < codigos.length; i++) {
          $("#cristal").append($('<option>', {value: idCristal[i], text: codigos[i] + " — " + descripciones[i]}));
        }

        //CARGAR TABLA CRISTALES
        arrayCristales = []
        for (let i = 0; i < datos[2].length; i++) {
        arrayCristal = []
        arrayCristal.push("'"+datos[2][i].otro+"'", datos[2][i].importeSinIva, datos[2][i].importeConIva, datos[2][i].cantidad, datos[2][i].cristalID, "'"+datos[2][i].esAPedir+"'");
        arrayCristales.push(arrayCristal);
        tablaCristales.row.add([
            datos[2][i].codigo,
            datos[2][i].descripcion,
            datos[2][i].cantidad,
            datos[2][i].otro,
            datos[2][i].importeSinIva,
            datos[2][i].importeConIva,
            datos[2][i].cristalID,
            datos[2][i].esAPedir
        ]).draw(false);
        }
        $("#cristales").attr('value', JSON.stringify(arrayCristales))

        //TRABAJO
        arrayTrabajos = []
        for (let i = 0; i < datos[1].length; i++) {
          arrayTrabajos.push(datos[1][i].trabajoID)
        }
        $("#trabajo").val(arrayTrabajos)
        $('#trabajo').trigger('change');

        //PAGO - TIPO DE PAGO
        if(datos[0][0].esPago == "Si"){
          $("#esPago").prop("checked", true)
        } else {
          $("#esPago").prop("checked", false)
        }

        switch (datos[0][0].tipoPago) {
          case "Efectivo":
            $("#tipoPago").val(1)
          break;
          case "Débito":
            $("#tipoPago").val(2)
          break;
          case "Crédito":
            $("#tipoPago").val(3)
          break;
          default:
            $("#tipoPago").val(0)
          break;
        }
        //ARCHIVOS
        $("#contentArchivos").append('<label for="" class="form-label text-dark">Archivos</label><div class="row" id="rowArchivos"></div>')
        
        if(datos[3][0]){
          archivosNombre = []
          archivosHash = []
          archivosExt = []
          for (let i = 0; i < datos[3].length; i++) {
            archivosNombre.push(datos[3][i].nombre)
            archivosHash.push(datos[3][i].path)
            archivosExt.push(datos[3][i].ext)
          }

          for(j=0; j<archivosHash.length; j++){
              if(archivosExt[j] == 'pdf'){
                $("#rowArchivos").append('<div id="'+archivosHash[j]+'" class="col-sm-2"> \
                  <i class="fas fa-times eliminarArchivo dispNone mb-1"></i> \
                  <a href="../files/'+archivosHash[j]+'" target="_blank"> \
                      <img src="../img/archivoPDF.png" alt="Archivo PDF" class="img-fluid pdf-modal"> \
                  </a> \
                  <p class="text-center mt-2 font-italic nombreArchivo">'+archivosNombre[j]+'</p> \
                  </div>');
              } else{
                  $("#rowArchivos").append('<div id="'+archivosHash[j]+'" class="col-sm-2"> \
                    <i class="fas fa-times eliminarArchivo dispNone mb-1"></i> \
                    <a href="../files/'+archivosHash[j]+'" data-lightbox="roadtrip" data-title="Fiat_Siena_2.jpg"> \
                        <img src="../files/'+archivosHash[j]+'" alt="Imagen 1" class="img-fluid img-modal"> \
                    </a> \
                    <p class="text-center mt-2 font-italic nombreArchivo">'+archivosNombre[j]+'</p> \
                  </div> \
                  ');
              }
          }
        }else{
          $("#rowArchivos").append("<i>No hay archivos anexados...</i>")
        }

        if (datos[0][0].estado == "Finalizado"){
          $("#btn-finalizarTurno").hide()
        }else{
          $("#btn-finalizarTurno").show()
        }
      }
    });

    $(".inputForm").prop("disabled", true);
    $("#btn-editarTurno").css('visibility', 'visible');
    $("#btn-finalizarTurno").css('visibility', 'visible');
    $("#btn-eliminarTurno").css('visibility', 'visible');
    $(".btn-editar").hide();
    $("#btn-ok").show();
    $(".select2-search.select2-search--inline").remove();
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
    $(".eliminarArchivo").show();
    $(".select2-search.select2-search--inline").remove();
    $("#rowArchivos>i").remove()
    $("#rowArchivos").append('<div id="wrapperArchivo" class="wrapperArchivo col-sm-2"> \
        <i class="fa-solid fa-cloud-arrow-up fa-2xl"></i> \
        <p class="mb-0">Subir Archivos</p> \
    </div>')
    $("#modalTurnoTitle").text("Editar Turno");
    $("#modalTurnoHeader").css("background-color", "#0b5ed7");
  });

  /*---------- FINALIZAR ----------*/
  $(document).on("click", "#btn-finalizarTurno", function(){
    tipoForm="finalizar"
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

    var cristalesEliminar = (arrayCristales.filter(c => c[5] == "'Sí'")).map(e => [e[3], e[4]])

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
              data: { 
                opcion: 4, 
                idTurno: evento.event.id, 
                cristalesEliminar: cristalesEliminar 
              },
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
    var hora = $("#hora option:selected").text();
    if(hora == "Mañana"){
      fecha = fecha+"T08:00:00"
    }else{
      fecha = fecha+"T14:00:00"
    }
    var telefono = $("#telefono").val();
    var dominio = ($("#dominio").val()).toUpperCase();
    var modeloID =$("#modelo").val();
    var cristales = ($("#cristales").val()) ? JSON.parse($("#cristales").val()) : [];
    var empresa = $("#empresa option:selected").val();  
    var trabajo = $("#trabajo").val();
    var importeTrabajo = $("#importeTrabajo").val();
    var observacion = $("#observacion").val();
    var cristalesAPedir = ($("#cristalesAPedir").val()) ? JSON.parse($("#cristalesAPedir").val()) : [];
    if($("#esPago").is(":checked")){
      var esPago = "Si";
    }else{
      var esPago = "No";
    }
    
    if($("#tipoPago option:selected").text() == "Tipo"){
      var tipoPago = "";
    }else{
      var tipoPago = $("#tipoPago option:selected").text();
    }
    
    var numFactura = $("#numFactura").val();
    var siniestro = $("#siniestro").val();

    if(tipoForm == 'alta'){
      $.ajax({
          url: "crudTurnos.php",
          type: "POST",
          datatype: "json",
          data: {
            opcion: 2,
            fecha: fecha,
            hora: hora,
            contacto: contacto,
            telefono: telefono,
            dominio: dominio,
            empresaID: empresa,
            cristales: cristales,
            trabajo: trabajo,
            importeTrabajo: importeTrabajo,
            observacion: observacion,
            esPago: esPago,
            tipoPago: tipoPago,
            siniestro: siniestro,
            numFactura: numFactura,
            modeloID: modeloID,
            cristalesAPedir: cristalesAPedir
          },
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
                    start: fecha,
                    end: null
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
            banderaCristales = $("#banderaCristales").val();
            banderaTrabajos = $("#banderaTrabajos").val();
            $.ajax({
              url: "crudTurnos.php",
              type: "POST",
              datatype: "json",
              data: { 
                opcion: 3, 
                idTurno: evento.event.id,
                fecha: fecha,
                hora: hora,
                contacto: contacto,
                telefono: telefono,
                dominio: dominio,
                empresaID: empresa,
                cristales: cristales,
                trabajo: trabajo,
                importeTrabajo: importeTrabajo,
                observacion: observacion,
                esPago: esPago,
                tipoPago: tipoPago,
                siniestro: siniestro,
                numFactura: numFactura,
                modeloID: modeloID,
                banderaCristales: banderaCristales,
                banderaTrabajos: banderaTrabajos
              },
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
                    turno.setStart(fecha)
                    turno.setEnd(null)
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

  /*$('#trabajo').on('select2:opening select2:closing select2:change', function( event ) {
    var $searchfield = $(this).parent().find('.select2-search');
    $searchfield.remove()
  });*/


  /*-------CARGAR DESPLEGABLES COMP - MARCA - MODELO - CRISTAL-------*/
  
  /*$.ajax({
    type: "POST",
    url: 'crudTurnos.php',
    datatype:"json",    
    data:  { opcion: 6 }, 
    success: function(data) {
        var datos = JSON.parse(data);
        for (let i = 0; i < datos.length; i++) {
            $("#empresa").append("<option value=" + datos[i].idEmpresa + ">" + datos[i].nombre + "</option>");
        } 
    }
  });

  $.ajax({
    type: "POST",
    url: 'crudTurnos.php',
    datatype:"json",    
    data:  { opcion: 7 }, 
    success: function(data) {
        var datos = JSON.parse(data);
        for (let i = 0; i < datos.length; i++) {
            $("#marca").append("<option value=" + datos[i].idMarca + ">" + datos[i].nombre + "</option>");
        } 
    }
  });*/

  /*$(document).on("change", "#marca", function() {
    marcaID = $("#marca option:selected").val();
    $("#modelo").html("<option value=>Modelo</option>");
    $("#cristal").html("<option value=>Cristal</option>");
    $("#alertaCristal").hide()
    if(marcaID){
        $.ajax({
            type: "POST",
            url: 'crudTurnos.php',
            datatype:"json",    
            data:  { opcion: 8, marcaID: marcaID },
            success: function(data) {
                var datos = JSON.parse(data);
                for (let i = 0; i < datos.length; i++) {
                    $("#modelo").append("<option value=" + datos[i].idModelo + ">" + datos[i].nombre + "</option>");
                }
            }
        });
    }
  });

  $(document).on("change", "#modelo", function() {
    modeloID = $("#modelo option:selected").val();
    $("#cristal").html("<option value=>Cristal</option>");
    $("#alertaCristal").hide()
    if(modeloID){
        $.ajax({
            type: "POST",
            url: 'crudTurnos.php',
            datatype:"json",    
            data:  { opcion: 9, modeloID: modeloID },
            success: function(data) {
                var datos = JSON.parse(data);
                for (let i = 0; i < datos.length; i++) {
                  $("#cristal").append("<option value=" + datos[i].idCristal + ">" + datos[i].codigo + ' — ' + datos[i].descripcion + "</option>");
                }
            }
        });
    }
  });*/

  $(document).on("change", "#cristal", function() {
    idCristal = $("option:selected", this).val();
    
    if(idCristal){
      $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype:"json",
        data: {
            opcion: 14,
            cristalID: idCristal
        },
        beforeSend: function() {
            $('#loader').removeClass('hidden')
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        success: function(data) {
          var datos = JSON.parse(data);
          cantidadStock = datos[0].cantidad
          $("#alertaCristal").text("Cantidad Disponible: " + datos[0].cantidad)
          $("#alertaCristal").show()
        }
      })
    } else {
      $("#alertaCristal").hide()
    }
  });

  $(document).on("change", "#empresa", function() {
    if($("#cristales").val()){
      Swal.fire({
        title: '¿Seguro?',
        text: '¿Estás seguro que quieres cambiar la empresa?',
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          idEmpresa = $("#empresa").val();
          cristales = $("#cristales").val();
          cristalesACambiar = "";
          cristalesCambioEmp = JSON.parse(cristales);
          for (let i = 0; i < cristalesCambioEmp.length; i++) {
            if (cristalesCambioEmp[i][0] == "'No'") {
              if(i==0){
                cristalesACambiar=cristalesACambiar+cristalesCambioEmp[i][4]
              } else {
                cristalesACambiar=cristalesACambiar+','+cristalesCambioEmp[i][4]}
            }
          }
          $.ajax({
            type: "POST",
            url: 'crudTurnos.php',
            datatype:"json",
            data: {
                opcion: 11,
                idCristales: cristalesACambiar,
                empresaID: idEmpresa
            },
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function() {
                $('#loader').addClass('hidden')
            },
            success: function(data) {
                var datos = JSON.parse(data);
                for (let i = 0; i < cristalesCambioEmp.length; i++) {
                    for (let j = 0; j < datos.length; j++) {
                        if (cristalesCambioEmp[i][4] == datos[j].cristalID) {
                          cristalesCambioEmp[i][1] = (datos[j].totalSinIva * cristalesCambioEmp[i][3]).toFixed(2)
                          cristalesCambioEmp[i][2] = (datos[j].totalConIva * cristalesCambioEmp[i][3]).toFixed(2)
                        }
                    }
                }
                for (i = 0; i < cristalesCambioEmp.length; i++) {
                    tablaCristales.cell(i, 4).data(cristalesCambioEmp[i][1]).draw();
                    tablaCristales.cell(i, 5).data(cristalesCambioEmp[i][2]).draw();
                }
                $("#cristales").attr('value', JSON.stringify(cristalesCambioEmp));
                Swal.fire({
                  title: 'Exito',
                  text: 'Los precios se actualizaron correctamente',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                })
            }
          })
        }
      }) 
    }
  });


  /*---- TABLA CRISTALES ----*/

  tablaCristales = $('#tablaCristales').DataTable({
    select: true,
    "ordering": false,
    "lengthChange": false,
    "bPaginate": false,
    "bInfo": false,
    "bFilter": false,
    "language": {
        "zeroRecords": "No se encontraron resultados",
        "sProcessing": "Procesando..."
    },
    "columns": [
        null,
        null,
        null,
        null,
        null,
        null,
        { "visible": false },
        { "visible": false }
      ]
  });

  tablaCristales.on('select', function(e, dt, type, indexes) {
    idCristal = tablaCristales.rows(indexes).data().toArray()[0][6];
    $("#cristalEliminar").attr("value", idCristal)
  });

  tablaCristales.on('deselect', function(e, dt, type, indexes) {
      $("#cristalEliminar").attr("value", "")
  });

  $(document).on("click", "#otro", function() {
    if (this.checked) {
      $("#colImporte").show();
    } else {
      $("#colImporte").hide();
      $("#importe").val('')
    }
  });

  $(document).on("click", "#agregarCristal", async function() {
    idCristal = $("#cristal option:selected").val();
    idEmpresa = $("#empresa option:selected").val();
    cantidad = $("#cantidad").val();
    cristal = $("#cristal option:selected").text();
    cut = cristal.split(' — ');
    codigo = cut[0];
    descripcion = cut[1];
    existe = tablaCristales.column(0).data().filter(function(value, index) {
        return value == codigo;
    })
    if ((idEmpresa && idCristal) && (cantidad > 0) && (!existe[0])) {
        otro = $("#otro").prop("checked")
         
        if (!otro || (otro && $("#importe").val())) {
            cantidadAPedir = cantidadStock - cantidad;
            //arrayStock = [];
            if(cantidadAPedir < 0){
              //arrayStock.push(idCristal, (cantidadAPedir*-1))
              cristalesAPedir.push([idCristal, (cantidadAPedir*-1)])
              $("#cristalesAPedir").attr('value', JSON.stringify(cristalesAPedir))
              esAPedir = 'Sí'
            }else{
              esAPedir = 'No'
            }

            if (otro) {
                importeTotalSinIva = ($("#importe").val() * cantidad).toFixed(2);
                importeTotalConIva = (($("#importe").val() * 1.21) * cantidad).toFixed(2);
                cristalOtro = 'Sí'
              } else {
                importeArray = await cargarImporte(idCristal, idEmpresa, cantidad);
                importeTotalSinIva=importeArray[0];
                importeTotalConIva=importeArray[1];
                cristalOtro = 'No'
            }
            
            arrayCristal = [];
            arrayCristales = [];
            if ($("#cristales").val()) {
                arrayCristales = JSON.parse($("#cristales").val())
            }
            arrayCristal.push("'"+cristalOtro+"'", importeTotalSinIva, importeTotalConIva, cantidad, idCristal, "'"+esAPedir+"'");
            arrayCristales.push(arrayCristal);
            $("#cristales").attr('value', JSON.stringify(arrayCristales))
            tablaCristales.row.add([
                codigo,
                descripcion,
                cantidad,
                cristalOtro,
                importeTotalSinIva,
                importeTotalConIva,
                idCristal,
                esAPedir
            ]).draw(false);
            $("#importe").val('')
            $("#colImporte").hide();
            $("#otro").prop("checked", false)
            //$("#cristal").val(0).trigger('change');
            $("#cristal").val(0);
            $("#cantidad").val('')
            //$("#cristal").prop("disabled", false);
            $("#banderaCristales").attr('value', "cambio")
            $("#alertaCristal").hide()
        } else {
            Swal.fire({
                title: 'Importe vacío',
                text: 'Debes ingresar un importe',
                icon: 'warning'
            })
        }
    } else if (cantidad <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'No puede agregarse un cristal con una cantidad menor a uno',
            icon: 'error'
        })
        $("#cantidad").val('')
    } else if (existe[0]) {
        Swal.fire({
            title: '¡Cuidado!',
            text: 'El codigo de este cristal ya existe en la tabla.',
            icon: 'warning'
        })
        //$("#cristal").val(0).trigger('change');
        $("#cristal").val(0);
        $("#cantidad").val('');
    } else {
        Swal.fire({
            title: '¡Cuidado!',
            text: 'Campo Compañia y/o Cristal incompletos',
            icon: 'warning'
        })
    }

  });

  $(document).on("click", "#eliminarCristal", function() {
    if ($('.selected')[0]) {
        codigo = tablaCristales.row('.selected').data()[0];
        descripcion = tablaCristales.row('.selected').data()[1];
        Swal.fire({
            title: '¿Seguro?',
            text: '¿Estás seguro que quieres eliminar el cristal ' + codigo + ' - ' + descripcion +' ?',
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if(result.isConfirmed){
                tablaCristales.row('.selected').remove().draw(false);
                arrayCristales = JSON.parse($("#cristales").val()).filter(elem => elem[4] != $("#cristalEliminar").val()) //Nuevo array donde codCristales != codCristal seleccionado a eliminar
                cristalesAPedir = JSON.parse($("#cristalesAPedir").val()).filter(elem => elem[0] != $("#cristalEliminar").val())
                $("#cristales").attr('value', JSON.stringify(arrayCristales))
                $("#cristalesAPedir").attr('value', JSON.stringify(cristalesAPedir))
                //$("#cristal").val(0).trigger('change');
                $("#cristal").val(0)
                $("#cantidad").val('')
                $("#importe").val('') 
                $("#colImporte").hide()
                $("#otro").prop("checked", false)
                //$("#cristal").prop("disabled", false)
                $("#cristalEliminar").attr("value", "")
                $("#banderaCristales").attr('value', "cambio")
            }else{
                tablaCristales.row('.selected').deselect();
            }
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: 'No hay seleccionado ningun cristal',
            icon: 'error'
        })
    }
  });

  $('#trabajo').on('change', function() {
    if(tipoForm == 'editar'){
      $("#banderaTrabajos").attr('value', "cambio")
    }
  })

  /*---------- ARCHIVOS ----------*/
  //const dt = new DataTransfer();
  $(document).on("click", "#wrapperArchivo", function(e){
    $("#archivo").click();
  })

  $(document).on("change", "#archivo", function(){
    agregarArchivo(this.files, evento.event.id)
  })

  $(document).on("click", ".eliminarArchivo", function(){
      nombreHash =$(this).parents()[0].id
      Swal.fire({
        title: '¿Seguro?',
        text: '¿Estás seguro que quieres eliminar este archivo?',
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
                url: "delete.php",
                type: "POST",
                datatype: "json",
                data: { 
                  nombreHash: nombreHash,
                },
                success: function(response) {
                  if(response == 200){
                    $('div[id="'+nombreHash+'"]').remove()
                    Swal.fire({
                      title: 'Exito',
                      text: 'El archivo ha sido eliminado correctamente',
                      icon: 'success',
                      showConfirmButton: false,
                      timer: 1500,
                    })
                  } else {
                    Swal.fire({
                      title: 'Error',
                      text: 'No se ha podido eliminar el archivo',
                      icon: 'error',
                      showConfirmButton: false,
                      timer: 1500,
                    })
                  }
                }
            });
          }
        })
  })

  $(document).on("drop", "#wrapperArchivo", function(e){
      e.preventDefault();
      $("#wrapperArchivo").removeAttr('style');
      agregarArchivo(e.originalEvent.dataTransfer.files, evento.event.id)
  })

  $(document).on("dragover", "#wrapperArchivo", function(e){
      e.preventDefault();
      $("#wrapperArchivo").css("background", "#00000024")
  })

  $(document).on("dragleave", "#wrapperArchivo", function(e){
      e.preventDefault();
      $("#wrapperArchivo").removeAttr('style');
  })

});


async function cargarImporte(idCristal, idEmpresa, cantidad) {
return new Promise(function(resolve, reject) {
    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype:"json",
        data: {
            opcion: 10,
            cristalID: idCristal,
            empresaID: idEmpresa
        },
        beforeSend: function() {
            $('#loader').removeClass('hidden')
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        success: function(data) {
            var datos = JSON.parse(data);     
            importeTotalSinIva = datos[0].totalSinIva * cantidad
            importeTotalConIva = datos[0].totalConIva * cantidad
            resolve([importeTotalSinIva.toFixed(2), importeTotalConIva.toFixed(2)])
        }
    })
});
}

async function agregarArchivo(files, idTurno){
archivos = [];
for (i = 0; i < files.length; i++) {
    archivos.push(files[i].name);
}
if (files.length <= 0) {
    // Si no hay archivos, no continuamos
    return;
}
// Preparamos el formdata
const formData = new FormData();
// Agregamos cada archivo a "archivos[]". Los corchetes son importantes
for (const archivo of files) {
    formData.append("archivos[]", archivo);
}
// Los enviamos
    formData.append("idTurno", idTurno);
$.ajax({
    url: 'upload.php',
    type: 'post',
    data: formData,
    contentType: false,
    processData: false,
    success: function(response) {
        if (response != 0) {
          arrayNombres = JSON.parse(response);
          //--------------Muestra de archivos cargados--------------//
          for(j=0; j<arrayNombres.length; j++){
            if(arrayNombres[j][2] == 'pdf'){
              $("#rowArchivos").prepend('<div id="'+arrayNombres[j][1]+'" class="col-sm-2"> \
                <i class="fas fa-times eliminarArchivo mb-1"></i> \
                <a href="../files/'+arrayNombres[j][1]+'" target="_blank"> \
                    <img src="../img/archivoPDF.png" alt="Archivo PDF" class="img-fluid pdf-modal"> \
                </a> \
                <p class="text-center mt-2 font-italic nombreArchivo">'+arrayNombres[j][0]+'</p> \
                </div>');
            } else{
                $("#rowArchivos").prepend('<div id="'+arrayNombres[j][1]+'" class="col-sm-2"> \
                  <i class="fas fa-times eliminarArchivo mb-1"></i> \
                  <a href="../files/'+arrayNombres[j][1]+'" data-lightbox="roadtrip" data-title="Fiat_Siena_2.jpg"> \
                      <img src="../files/'+arrayNombres[j][1]+'" alt="Imagen 1" class="img-fluid img-modal"> \
                  </a> \
                  <p class="text-center mt-2 font-italic nombreArchivo">'+arrayNombres[j][0]+'</p> \
                </div> \
                ');
            }
          }
          //-------------------------------------------------------//
        } else {
          Swal.fire({
            title: 'Error',
            text: 'El archivo no ha sido cargado', 
            icon: 'error'
          })
        }
    },
});
}

async function cajaMes(mes){
$.ajax({
      type: "POST",
      url: "crudTurnos.php",
      datatype:"json",
      data: {
          opcion: 7,
          mes: mes
      },
      beforeSend: function() {
          $('#loader').removeClass('hidden')
      },
      complete: function() {
          $('#loader').addClass('hidden')
      },
      success: function(data){
        datos=JSON.parse(data);
        if(datos[0].total){
          total = (parseFloat(datos[0].total)).toLocaleString("es-ES");
          $("#totalMes").html('$' + total);
        }else{
          $("#totalMes").html('$0');
        }
      }
})
}

function exportarPDF(calendar){
moment.locale('es')
doc = new jsPDF("landscape");
let currentDate = calendar.getDate();
let eventos = calendar.getEvents();
var firstDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
var lastDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 6));

firstDay = firstDay.setHours(0,0,0,0) //horas, minutos, segundos, milisegundos
lastDay = lastDay.setHours(23,59,59,99) //horas, minutos, segundos, milisegundos
listEvents = eventos.filter(e => e.start >= firstDay && e.start <= lastDay);
doc.setFontSize(22);
doc.text("Turnos Parabrisas 141", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center'});
doc.setFontSize(20);
doc.text(moment(firstDay).format("DD")+ " - "+moment(lastDay).format("DD MMM YYYY"), doc.internal.pageSize.getWidth() / 2, 30, { align: 'center'});
arrayIdTurnosAux = listEvents.map(function(e){ return e.id })
arrayIdTurnos = JSON.stringify(arrayIdTurnosAux).slice(1, -1)

if(arrayIdTurnosAux.length > 0){
  var arrayDomingo = [], arrayLunes = [], arrayMartes = [], arrayMiercoles = [], arrayJueves = [], arrayViernes = [], arraySabado = [];
  //var contentDomingo, contentLunes, contentMartes, contentMiercoles, contentJueves, contentViernes, contentSabado;

  //Si nos desplazamos entre meses no trae los id al apretar el boton Exportar
  $.ajax({
    type: "POST",
    url: "crudTurnos.php",
    datatype:"json",
    data: {
        opcion: 15,
        arrayIdTurnos: arrayIdTurnos
    },
    beforeSend: function() {
        $('#loader').removeClass('hidden')
    },
    complete: function() {
        $('#loader').addClass('hidden')
    },
    success: function(data){
      datos=JSON.parse(data);
      for (i=0; i < datos[0].length; i++) {
        switch (moment(datos[0][i].fecha).format('dddd')){
          case "domingo":
            arrayDomingo = arrayDia(datos, arrayDomingo, i);
            contentDomingo = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "lunes":
            arrayLunes = arrayDia(datos, arrayLunes, i);
            contentLunes = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "martes":
            arrayMartes = arrayDia(datos, arrayMartes, i);
            contentMartes = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "miercoles":
            arrayMiercoles = arrayDia(datos, arrayMiercoles, i);
            contentMiercoles = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "jueves":
            arrayJueves = arrayDia(datos, arrayJueves, i);
            contentJueves = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "viernes":
            arrayViernes = arrayDia(datos, arrayViernes, i);
            contentViernes = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
          case "sabado":
            arraySabado = arrayDia(datos, arraySabado, i);
            contentSabado = moment(datos[0][i].fecha).format("DD [de] MMMM")
          break;
        }
      }
      if(arrayDomingo.length > 0){
        renderDia("Domingo", contentDomingo, arrayDomingo)
      }
    
      if(arrayLunes.length > 0){
        renderDia("Lunes", contentLunes, arrayLunes)
      }
      
      if(arrayMartes.length > 0){
        renderDia("Martes", contentMartes, arrayMartes)
      }
    
      if(arrayMiercoles.length > 0){
        renderDia("Miercoles", contentMiercoles, arrayMiercoles)
      }
      
      if(arrayJueves.length > 0){
        renderDia("Jueves", contentJueves, arrayJueves)
      }

      if(arrayViernes.length > 0){
        renderDia("Viernes", contentViernes, arrayViernes)
      }

      if(arraySabado.length > 0){
        renderDia("Sabado", contentSabado, arraySabado)
      }

      doc.save('Turnos Parabrisas 141 ('+ moment(currentDate).format('DD-MM-YY') +').pdf')
      doc.autoTable.previous.finalY = 35;
    }
  })

  } else {
    Swal.fire({
      title: '¡Cuidado!',
      text: 'No tenes turnos para esta semana',
      icon: 'info',
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

function arrayDia (datos, arrayDia, i){
  arrayDia.push([
    datos[0][i].hora, datos[0][i].contacto, 
    datos[0][i].empresa, 
    datos[0][i].telefono, 
    datos[0][i].dominio, 
    datos[1][i].codigos, 
    datos[1][i].descripciones,
    datos[1][i].posiciones,
    datos[1][i].lados,
    datos[1][i].colores,
    datos[0][i].trabajos,
  ])
  return arrayDia;
}

function renderDia (dia, contentDia, arrayDia){
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 5 || 40,
    head: [
      [{content: dia + ' - '+ contentDia, colSpan: 11, styles: {halign: 'left', fillColor: [213, 105, 59]}}],
      ['Hora', 'Contacto', 'Compañía', 'Teléfono', 'Dominio', 'Cristales', 'Descripción', 'Posición', 'Lado', 'Color', 'Trabajos']
    ],
    headStyles :{halign: 'center', fillColor : [253, 139, 90]},
    styles: {
      halign: 'center'
    },
    body: arrayDia,
    theme: 'grid',
  });
}