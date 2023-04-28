$(document).ready(function() {
    var tipoForm ='';
    var evento = '';
    var hoy = new Date();
    arrayCristales = [];
    arrayCristal = [];
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
                      start: doc[i].fechaHora,
                      //end: doc[i].fechaHora,
                      /*tel: '2215754',
                      trabajo: ['Trabajo1','Trabajo 2'],
                      idArchivo: doc[i].idArchivo,
                      archivoNombre: doc[i].archivoNombre,
                      archivoHash: doc[i].archivoHash,
                      archivoExt: doc[i].archivoExt,*/
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

    /*---------- RESET MODAL CUANDO CIERRA ----------*/
    $("#modalTurno").on("hidden.bs.modal", function(){
      $("#formTurno").trigger("reset");
      $("#empresa").val("");
      tablaCristales.clear().draw();
      $("#cristales").attr('value', '');
      $("#banderaCristales").attr('value', '');
      $("#banderaTrabajos").attr('value', '');
    });

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
        $("#hora").val(hoy.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
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
          fechaHora = evento.event.startStr.split('T');
          $("#contacto").val(evento.event.title);
          $("#fecha").val(fechaHora[0]);
          $("#hora").val(fechaHora[1]);
          $("#telefono").val(datos[0][0].telefono);
          $("#dominio").val(datos[0][0].dominio);
          $("#empresa").val(datos[0][0].empresaID);
          $("#marca").val(datos[0][0].marcaID);
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
          arrayCristal.push("'"+datos[2][i].otro+"'", datos[2][i].importeSinIva, datos[2][i].importeConIva, datos[2][i].cantidad, datos[2][i].cristalID);
          arrayCristales.push(arrayCristal);
          tablaCristales.row.add([
              datos[2][i].codigo,
              datos[2][i].descripcion,
              datos[2][i].cantidad,
              datos[2][i].otro,
              datos[2][i].importeSinIva,
              datos[2][i].importeConIva,
              datos[2][i].cristalID
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
          if(datos[3][0]){
            idArchivos = []
            archivosNombre = []
            archivosHash = []
            archivosExt = []
            for (let i = 0; i < datos[3].length; i++) {
              idArchivos.push(datos[3][i].idArchivo)
              archivosNombre.push(datos[3][i].nombre)
              archivosHash.push(datos[3][i].path)
              archivosExt.push(datos[3][i].ext)
            }

            $("#contentArchivos").html("<label for='' class='form-label text-dark'>Archivos</label><div class='row' id='rowArchivos'></div>");
            for(j=0; j<idArchivos.length; j++){
                if(archivosExt[j] == 'pdf'){
                  $("#rowArchivos").append('<div id="'+idArchivos[j]+'" class="col-sm-2"> \
                    <i class="fas fa-times eliminarArchivo mb-1"></i> \
                    <a href="../archivos/'+archivosHash[j]+'" target="_blank"> \
                        <img src="../img/archivoPDF.png" alt="Archivo PDF" class="img-fluid pdf-modal"> \
                    </a> \
                    <p class="text-center mt-2 font-italic nombreArchivo">'+archivosNombre[j]+'</p> \
                    </div>');
                } else{
                    $("#rowArchivos").append('<div id="'+idArchivos[j]+'" class="col-sm-2"> \
                      <i class="fas fa-times eliminarArchivo mb-1"></i> \
                      <a href="../archivos/'+archivosHash[j]+'" data-lightbox="roadtrip" data-title="Fiat_Siena_2.jpg"> \
                          <img src="../archivos/'+archivosHash[j]+'" alt="Imagen 1" class="img-fluid img-modal"> \
                      </a> \
                      <p class="text-center mt-2 font-italic nombreArchivo">'+archivosNombre[j]+'</p> \
                    </div> \
                    ');
                }
            }
          }
          $("#rowArchivos").append('<div id="wrapperArchivo" class="wrapperArchivo col-sm-2"> \
            <input id="archivo" name="archivo" class="file-input" type="file" accept=".pdf, .jpg, .jpeg, .png, .tif" multiple="multiple" hidden=""> \
            <i class="fa-solid fa-cloud-arrow-up fa-2xl"></i> \
            <p class="mb-0">Subir Archivos</p> \
          </div> ');
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
      $(".select2-search.select2-search--inline").remove();
      $("#modalTurnoTitle").text("Editar Turno");
      $("#modalTurnoHeader").css("background-color", "#0b5ed7");
    });

    /*---------- FINALIZAR ----------*/
    $(document).on("click", "#btn-finalizarTurno", function(){
      tipoForm="finalziar"
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
      var telefono = $("#telefono").val();
      var dominio = ($("#dominio").val()).toUpperCase();
      var modeloID =$("#modelo").val();
      var cristales = JSON.parse($("#cristales").val());
      var empresa = $("#empresa option:selected").val();  
      var trabajo = $("#trabajo").val();
      var observacion = $("#observacion").val();
      
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
              fechaHora: fecha+'T'+hora,
              contacto: contacto,
              telefono: telefono,
              dominio: dominio,
              empresaID: empresa,
              cristales: cristales,
              trabajo: trabajo,
              observacion: observacion,
              esPago: esPago,
              tipoPago: tipoPago,
              siniestro: siniestro,
              numFactura: numFactura,
              modeloID: modeloID
              //Archivos
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
              banderaCristales = $("#banderaCristales").val();
              banderaTrabajos = $("#banderaTrabajos").val();
              $.ajax({
                url: "crudTurnos.php",
                type: "POST",
                datatype: "json",
                data: { 
                  opcion: 3, 
                  idTurno: evento.event.id,
                  fechaHora: fecha+'T'+hora,
                  contacto: contacto,
                  telefono: telefono,
                  dominio: dominio,
                  empresaID: empresa,
                  cristales: cristales,
                  trabajo: trabajo,
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
                      turno.setStart(fecha+'T'+hora)
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

    $(document).on("change", "#marca", function() {
      marcaID = $("#marca option:selected").val();
      $("#modelo").html("<option value=>Modelo</option>");
      $("#cristal").html("<option value=>Cristal</option>");
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
      /*else{
          $("#modelo").html("<option value=>Modelo</option>");
          $("#cristal").html("<option value=>Cristal</option>");
      }*/
    });

    $(document).on("change", "#modelo", function() {
      modeloID = $("#modelo option:selected").val();
      $("#cristal").html("<option value=>Cristal</option>");
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
      /*else{
          $("#cristal").html("<option value=>Cristal</option>");
      }*/
    });

    /*$(document).on("change", "#empresa", function() {
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
                  arrayCristales = [];
                  tablaCristales.rows().remove().draw(false);
                  $("#cristales").attr("value", ""); 
              }
          })
      }
    });*/

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
              if (cristalesCambioEmp[i][0] == "No") {
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
              arrayCristal.push("'"+cristalOtro+"'", importeTotalSinIva, importeTotalConIva, cantidad, idCristal);
              arrayCristales.push(arrayCristal);
              $("#cristales").attr('value', JSON.stringify(arrayCristales))
              tablaCristales.row.add([
                  codigo,
                  descripcion,
                  cantidad,
                  cristalOtro,
                  importeTotalSinIva,
                  importeTotalConIva,
                  idCristal
              ]).draw(false);
              $("#importe").val('')
              $("#colImporte").hide();
              $("#otro").prop("checked", false)
              //$("#cristal").val(0).trigger('change');
              $("#cristal").val(0);
              $("#cantidad").val('')
              //$("#cristal").prop("disabled", false);
              $("#banderaCristales").attr('value', "cambio")
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
                  $("#cristales").attr('value', JSON.stringify(arrayCristales))
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