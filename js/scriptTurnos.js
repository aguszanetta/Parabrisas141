
$(document).ready(function() {
    window.jsPDF = window.jspdf.jsPDF;
    //import jsPDF from './';
    //import { jsPDF } from "jspdf";
    //import autoTable from 'jspdf-autotable'
    //window.jspdf.autotable = window.jspdf.autotable.jspdf.autotable; 
    var tipoForm ='';
    var idTurno = '';
    const fechaHoy = new Date();

    arrayCristales = [];
    arrayCristal = [];
    //arrayStock = [];
    cristalesAPedir = [];
    var cantidadStock = 0;

    //TABLA TURNOS
    tablaTurnos = $('#tablaTurnos').DataTable({
        "ajax": {
            "url": "crudTurnos.php",
            "method": 'POST',
            "data": { opcion: 1 },
            "dataSrc": "",
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function(data) {
                $('#loader').addClass('hidden')
            },
        },
        "columns": [
            { "data": "idTurno", "visible": false },
            {   
                "data": "fecha",
                "type": "moment- DD-MM-YYYY",
                "width": "10%",
                render: function(data) {
                  return moment(data, 'YYYY-MM-DD').format('DD-MM-YYYY');
                }
            },
            { "data": "franjaHoraria", "sortable": false },
            { "data": "hora", "sortable": false },
            { "data": "contacto", "sortable": false },
            { "data": "telefono", "sortable": false },
            { "data": "dominio", "sortable": false },
            { "data": "vehiculo", "sortable": false },
            { "data": "trabajos", 
              "sortable": false, 
              "render": function(data){
                trabajos = data.split(',')
                todos = ''
                for (i = 0; i < trabajos.length; i++) {
                  todos = todos + "<li class='list-group-item p-0 bg-transparent'>" + trabajos[i] + " </li>"
                }
                return "<ul class='list-group list-group-flush text-center'>" + todos + "</ul>"
              }
            },
            { "defaultContent": "",  "visible": false , "sortable": false },
            { "defaultContent": "",  "visible": false , "sortable": false },
            { "data": "empresa", "sortable": false },
            { "data": "siniestro", "visible": true , "sortable": false },
            { "data": "numFactura", "visible": true , "sortable": false },
            { "data": "esPago", "sortable": false },
            { "defaultContent": "",  "visible": false , "sortable": false },
            { "data": "esAPedir", 
              "sortable": false,
              "render": function(data){
                aPedir = data.split(',')
                todos = ''
                for (i = 0; i < aPedir.length; i++) {
                  todos = todos + "<li class='list-group-item p-0 bg-transparent'>" + aPedir[i] + " </li>"
                }
                return "<ul class='list-group list-group-flush text-center'>" + todos + "</ul>"
              }
            },
            { "data": "empleado", "sortable": false },
            { "data": "estado", "sortable": false, "visible": false },
            {
              "data": { "data": "idTurno" },
              "orderable": false,
              "sortable": false,
              "render": function(data, type, row) {
                  switch (data.estado) {
                    case "Activo":
                        return "<div class='text-center'><button class='btn btn-orange text-white btn-EditarTurno'><i class='fa-solid fa-info-circle'></i></button></div>" 
                        break;
                    case "Finalizado":
                        return  "<div class='text-center'><button class='btn btn-secondary text-white btn-EditarTurno'><i class='fa-solid fa-info-circle'></i></button></div>"
                        break;
                  }
              }
          }
        ],
        "pageLength": 50,
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
            "searchBuilder": {
                add: 'Agregar Condición',
                condition: 'Comparación',
                clearAll: 'Limpiar',
                //delete: 'Eliminar',
                deleteTitle: 'Eliminar Condición',
                data: 'Columna',
                //left: 'Izquierda',
                leftTitle: 'Eliminar Subcondición',
                logicAnd: 'Y',
                logicOr: 'O',
                //right: 'Derecha',
                rightTitle: 'Agregar Subcondición',
                title: {
                    0: '',
                    _: ''
                },
                value: 'Opción',
                valueJoiner: 'entre',
                "conditions": {
                    "date": {
                        "after": "Despues",
                        "before": "Antes",
                        "between": "Entre",
                        "empty": "Vacío",
                        "equals": "Igual a",
                        "notBetween": "No entre",
                        "notEmpty": "No Vacio",
                        "not": "Diferente de"
                    },
                    "number": {
                        "between": "Entre",
                        "empty": "Vacio",
                        "equals": "Igual a",
                        "gt": "Mayor a",
                        "gte": "Mayor o igual a",
                        "lt": "Menor que",
                        "lte": "Menor o igual que",
                        "notBetween": "No entre",
                        "notEmpty": "No vacío",
                        "not": "Diferente de"
                    },
                    "string": {
                        "contains": "Contiene",
                        "empty": "Vacío",
                        "endsWith": "Termina en",
                        "equals": "Igual a",
                        "notEmpty": "No Vacio",
                        "startsWith": "Empieza con",
                        "not": "Diferente de",
                        "notContains": "No Contiene",
                        "notStartsWith": "No empieza con",
                        "notEndsWith": "No termina con"
                    },
                    "array": {
                        "not": "Diferente de",
                        "equals": "Igual",
                        "empty": "Vacío",
                        "contains": "Contiene",
                        "notEmpty": "No Vacío",
                        "without": "Sin"
                    },
                },
            },
        },
        //responsive: "true",
        order: {
            data: 'fecha',
            dir: 'desc'
        },
        searchBuilder: {
          columns: [1, 6, 9, 13, 14]
        },
        dom: 'QBfrtilp',
        buttons: [
            {
              titleAttr: 'Agregar Turno',
              text: '<i class="fas fa-plus"></i> ',
              className: 'btn btn-orange btn-icon br7px',
              attr: {
                id: 'btn-AltaTurno'
              }
            },
            { 
              extend: 'excelHtml5',
              action: function(e, dt, button, config) {
                // Mostrar spinner al hacer click
                $('#loader').removeClass('hidden')

                // Llamada al método de exportar y desactivar spinner al finalizar
                $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, button, config);

                setTimeout(function() {
                    // Ocultar spinner después de la exportación
                    $('#loader').addClass('hidden')
                }, 2000); // Puedes ajustar el tiempo si es necesario
              },
              customize: function(xlsx) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="H"]', sheet).attr('s', '55');
                $('row c[r="H2"]', sheet).attr('s', '2');
              },
              exportOptions: {
                  columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17],
                  format: {
                    body: function(data, row, column, node) {
                        tempDiv = document.createElement('div');
                        tempDiv.innerHTML = data;
                        if (column === 7) {
                          trabajosLi = tempDiv.getElementsByTagName("li")
                          liArray = [];
                          for (i = 0; i < trabajosLi.length; i++) {
                              if (trabajosLi[i].innerText.length) { liArray.push((trabajosLi[i].innerText)); }
                          }
                          return liArray.join("\n")
                        } else {
                          return tempDiv.innerText
                        }
                    }
                }
              },
              title: 'Turnos Parabrisas 141',
              text: '<i class="fas fa-file-excel"></i> ',
              titleAttr: 'Exportar a Excel',
              className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17],
                    format: {
                        body: function(data, row, column, node) {
                            tempDiv = document.createElement('div');
                            tempDiv.innerHTML = data;
                            if (column === 7) {
                              trabajosLi = tempDiv.getElementsByTagName("li")
                              liArray = [];
                              for (i = 0; i < trabajosLi.length; i++) {
                                  if (trabajosLi[i].innerText.length) { liArray.push((trabajosLi[i].innerText)); }
                              }
                              return liArray.join("\n")
                            } else {
                              return tempDiv.innerText
                            }
                        }
                    }
                },
                title: 'Turnos Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                action: function(e, dt, button, config) {
                  // Mostrar spinner al hacer click
                  $('#loader').removeClass('hidden')
  
                  // Llamada al método de exportar y desactivar spinner al finalizar
                  $.fn.dataTable.ext.buttons.pdfHtml5.action.call(this, e, dt, button, config);
  
                  setTimeout(function() {
                      // Ocultar spinner después de la exportación
                      $('#loader').addClass('hidden')
                  }, 2000); // Puedes ajustar el tiempo si es necesario
                },
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [-20, 0, 0, 0], //left, top, right, bottom
                        doc.content[1].layout = {
                            hLineWidth: function(i, node) {
                                return (i === 0 || i === node.table.body.length) ? 2 : 1;
                            },
                            vLineWidth: function(i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                            },
                            hLineColor: function(i, node) {
                                return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
                            },
                            vLineColor: function(i, node) {
                                return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
                            }
                        };
                },
            },
            /*--- Filtros Fecha ---*/
            {
              titleAttr: 'Filtrar Dia',
              text: 'Dia',
              className: 'btn btn-primary btn-icon br7px filterFecha',
              attr: {
                id: 'filtroDia'
              },
              action: function(e, dt, node, config){
                $.fn.dataTable.ext.search.pop()
                tablaTurnos.columns(1).search(moment(fechaHoy).format('DD-MM-YYYY')).draw();
              }
            },
            {
              titleAttr: 'Filtrar Semana',
              text: 'Sem',
              className: 'btn btn-primary btn-icon br7px filterFecha',
              attr: {
                id: 'filtroSemana'
              },
              action: function(e, dt, node, config) {
                tablaTurnos.columns(1).search('').draw();
                searchWeek();
              }
            },
            {
              titleAttr: 'Filtrar Mes',
              text: 'Mes',
              className: 'btn btn-primary btn-icon br7px filterFecha',
              attr: {
                id: 'filtroMes'
              },
              action: function(e, dt, node, config) {
                $.fn.dataTable.ext.search.pop()
                tablaTurnos.columns(1).search(moment(fechaHoy).format('MM-YYYY')).draw();
              }
            },
            {
              titleAttr: 'Filtrar',
              text: '<i class="fas fa-filter iconWhite"></i> ',
              className: 'btn btn-icon btn-primary br7px filterSB',
              action: function(e, dt, node, config) {
                  esVisible = $("#tablaTurnos_wrapper>.dtsb-searchBuilder").is(":visible");
                  if(esVisible){
                      $("#tablaTurnos_wrapper>.dtsb-searchBuilder").hide()
                  } else {
                      $("#tablaTurnos_wrapper>.dtsb-searchBuilder").show()
                  }
              }
            },
            {
              titleAttr: 'Recargar Tabla',
              text: '<i class="fas fa-refresh iconWhite"></i>',
              className: 'btn btn-warning btn-icon br7px',
              action: function(e, dt, node, config) {
                $.fn.dataTable.ext.search.pop()
                $(".filterFecha").removeClass('btn-orange')
                tablaTurnos.columns(1).search('').draw();
              }
            },
        ]
    });

    tablaTurnos.searchBuilder.container().prependTo(tablaTurnos.table().container());
    $("#tablaTurnos_wrapper>.dtsb-searchBuilder").hide();

    $(".fc-icon-caja").html('<i class="fa-solid fa-cash-register"></i>');
    $(".fc-icon-exportarTurnos").html('<i class="fa-solid fa-file-pdf"></i>');

    function searchWeek() {
      $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            
            let fechaDesde = moment().weekday(1).format('YYYY-MM-DD'); ;
            let fechaHasta = moment().weekday(6).format('YYYY-MM-DD'); ;
            var createdAt = moment( data[1], 'DD-MM-YYYY').format('YYYY-MM-DD'); 
    
            if (  
            (fechaDesde == "" && fechaHasta == "") ||
            (fechaDesde == "" && createdAt <= fechaHasta) ||
            (fechaDesde <= createdAt && fechaHasta == "") ||
            (fechaDesde <= createdAt && createdAt <= fechaHasta)
            ) {
                return true;
            }
                return false;
        }
      );
      tablaTurnos.draw()
    }

  
    $(document).on("click", ".filterFecha", function(){
      $(".filterFecha").removeClass('btn-orange')
      $(this).addClass('btn-orange')
    })

    $(document).on("click", ".filterSB", function(){
      if($(this).hasClass('btn-primary')){
        $(this).removeClass('btn-primary')
        $(this).addClass('btn-orange')
      }else {
        $(this).removeClass('btn-orange')
        $(this).addClass('btn-primary')
      }
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
      idTurno = ''
    });
  
    /*---------- CAJA ----------*/
    $(document).on("click", "#btnCaja", async function(){
      mesActual = fechaHoy.getMonth()+1;
      $("#mes").val(mesActual)
      await cajaMes(mesActual);
      $("#modalCaja").modal('show')
    })

    $(document).on("change","#mes", function(){
      cajaMes($("option:selected", this).val())
    })

    /*---------- ALTA ----------*/
    $(document).on('click', "#btn-AltaTurno", function(info) {
        tipoForm="alta";
        $(".inputForm").prop("disabled", false);
        $('#trabajo').val(null).trigger('change');
        $("#btn-editarTurno").css('visibility', 'hidden');
        $("#btn-finalizarTurno").css('visibility', 'hidden');
        $("#btn-eliminarTurno").css('visibility', 'hidden');
        $(".btn-editar").show();
        $("#btn-ok").hide();
        $(".select2-search.select2-search--inline").remove();
        $("#franjaHoraria").val(0)
        $("#modalTurnoHeader").css("background-color", "#d5693b");
        $("#modalTurnoTitle").text("Alta Turnos");
        $("#modalTurno").modal('show');
    });
  
    /*---------- DETALLE ----------*/
    $(document).on('click',".btn-EditarTurno", function(event, info) {
      tipoForm="detalle"
      fila = $(this).closest("tr");
      data = $('#tablaTurnos').DataTable().row(fila).data();
      idTurno = data['idTurno']
      $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype:"json",
        data: {
            opcion: 6,
            idTurno: idTurno
        },
        beforeSend: function() {
            $('#loader').removeClass('hidden')
        },
        complete: function() {
            $('#loader').addClass('hidden')
        },
        success: function(data) {
          datos = JSON.parse(data)
          fecha = datos[0][0].fechaHora
          contacto = datos[0][0].contacto
          $("#contacto").val(contacto);
          $("#fechaHora").val(fecha);
          if(datos[0][0].hora == "Mañana"){
            $("#franjaHoraria").val(1);
          }else{
            $("#franjaHoraria").val(2);
          }
          $("#telefono").val(datos[0][0].telefono);
          $("#dominio").val(datos[0][0].dominio);
          $("#empresa").val(datos[0][0].empresaID);
          $("#marca").val(datos[0][0].marcaID);
          $("#importeTrabajo").val(datos[0][0].importeTrabajo);
          $("#observacion").val(datos[0][0].observacion);
          $("#fechaPago").val(datos[0][0].fechaPago);
          $("#fechaEntrega").val(datos[0][0].fechaEntrega);
          $("#numFactura").val(datos[0][0].numFactura);
          $("#siniestro").val(datos[0][0].siniestro);
          $("#empleado").val(datos[0][0].empleadoID);
  
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
            case "Mercado Pago":
              $("#tipoPago").val(4)
            break;
            case "Transferencia":
              $("#tipoPago").val(5)
            break;
            case "Dolares":
              $("#tipoPago").val(6)
            break;
            case "Otros":
              $("#tipoPago").val(7)
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
          $("#formTurno").attr("data-estado", datos[0][0].estado)
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
      estado = $("#formTurno").attr("data-estado")

      if(estado == "Finalizado"){
        $("#trabajo, #importeTrabajo, #observacion, #esPago, #tipoPago, #fechaPago, #fechaEntrega, #numFactura, #siniestro, #empleado").prop("disabled", false);
      } else {
        $(".inputForm").prop("disabled", false);
      }

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
      tipoForm="finalizar";
      empleado = $("#empleado option:selected").val();
      if(empleado == 1){
        Swal.fire({
          title: 'Error',
          text: 'Debes asignar un empleado para poder finalizar el turno',
          icon: 'error'
      })
      } else {
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
                data: { opcion: 5, idTurno: idTurno},
                success: function() {
                    Swal.fire({
                        title: 'Exito',
                        text: 'El turno se finalizó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                      }).then( function(){
                        $('#modalTurno').modal('hide');
                        $("#tablaTurnos").DataTable().ajax.reload(null, true);
                    })
                }
            });
          }
        })
      }
    });
  
    /*---------- ELIMINAR ----------*/
    $(document).on("click", "#btn-eliminarTurno", function(){
        var cristalesEliminar = (arrayCristales.filter(c => c[5] == "'Sí'")).map(e => [e[3], e[4]])
        //idTurno = idTurno Datatable
  
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
                    idTurno: idTurno, 
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
                        $("#tablaTurnos").DataTable().ajax.reload(null, true);
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
      var fechaHora = $("#fechaHora").val();
      var franjaHoraria = $("#franjaHoraria option:selected").text();
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
      
      var fechaPago = $("#fechaPago").val();
      var fechaEntrega = $("#fechaEntrega").val();
      var numFactura = $("#numFactura").val();
      var siniestro = $("#siniestro").val();
      var empleadoID = $("#empleado").val()
      
      if(tipoForm == 'alta'){
        $.ajax({
            url: "crudTurnos.php",
            type: "POST",
            datatype: "json",
            data: {
              opcion: 2,
              fechaHora: fechaHora,
              franjaHoraria: franjaHoraria,
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
              fechaPago: fechaPago,
              fechaEntrega: fechaEntrega,
              siniestro: siniestro,
              numFactura: numFactura,
              empleadoID: empleadoID,
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
                    $("#tablaTurnos").DataTable().ajax.reload(null, true);
                })
            }
        });
      } else if(tipoForm == 'editar'){
        //idTurno = IDTurno Datatable
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
              cristalesAPedir = ($("#cristalesAPedir").val()) ? JSON.parse($("#cristalesAPedir").val()) : [];
              $.ajax({
                url: "crudTurnos.php",
                type: "POST",
                datatype: "json",
                data: { 
                  opcion: 3, 
                  idTurno: idTurno,
                  fechaHora: fechaHora,
                  franjaHoraria: franjaHoraria,
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
                  fechaPago: fechaPago,
                  fechaEntrega: fechaEntrega,
                  siniestro: siniestro,
                  numFactura: numFactura,
                  empleadoID: empleadoID,
                  modeloID: modeloID,
                  banderaCristales: banderaCristales,
                  banderaTrabajos: banderaTrabajos,
                  cristalesAPedir: cristalesAPedir
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
                      $("#tablaTurnos").DataTable().ajax.reload(null, true);
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
    
    $.ajax({
      type: "POST",
      url: 'crudTurnos.php',
      datatype:"json",    
      data:  { opcion: 17 }, 
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
      data:  { opcion: 19 }, 
      success: function(data) {
          var datos = JSON.parse(data);
          for (let i = 0; i < datos.length; i++) {
              $("#empleado").append("<option value=" + datos[i].idEmpleado + ">" + datos[i].nombre + "</option>");
          } 
      }
    });
  
    $.ajax({
      type: "POST",
      url: 'crudTurnos.php',
      datatype:"json",    
      data:  { opcion: 16 }, 
      success: function(data) {
          var datos = JSON.parse(data);
          for (let i = 0; i < datos.length; i++) {
              $("#marca").append("<option value=" + datos[i].idMarca + ">" + datos[i].nombre + "</option>");
          } 
      }
    });
  
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
                  $("#banderaCristales").attr('value', "cambio");
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
          null
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
        //idTurno = idTurno Datatable
        agregarArchivo(this.files, idTurno)
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
        //idTurno = idTurno DATATABLE
        $("#wrapperArchivo").removeAttr('style');
        agregarArchivo(e.originalEvent.dataTransfer.files, idTurno)
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
            importeTotalSinIva = datos[0].totalSinIva * cantidad;
            importeTotalConIva = datos[0].totalConIva * cantidad;
            resolve([importeTotalSinIva.toFixed(2), importeTotalConIva.toFixed(2)]);
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