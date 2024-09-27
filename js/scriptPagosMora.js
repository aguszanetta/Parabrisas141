$(document).ready(function() {
    tablaPagosMora = $('#tablaPagosMora').DataTable({
        "ajax": {
            "url": "crudTurnos.php",
            "method": 'POST',
            "data": { opcion: 12 },
            "dataSrc": "",
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function() {
                $('#loader').addClass('hidden')
            },
        },
        "columns": [
            { "data": "idTurno", "visible": false },
            {   "data": "fechaHora",
                "render": function(data) {
                    return moment(data).format('DD-MM-YYYY');
                }
            },
            { "data": "contacto", "sortable": false },
            { "data": "vehiculo", "sortable": false },
            { "data": "empresa", "sortable": false },
            { "data": "diasRestantes", "sortable": false },
            { "data": "diasMora", "sortable": false },
            {
                "data": "estado",
                "createdCell": function(td, cellData, rowData, row, col) {
                    $(td).attr('class', 'text-center')
                },
                "render": function(data, type, row) {
                    switch (data) {
                        case 'En Proceso':
                            return "<h5><span class='badge bg-primary'>En Proceso</span></h4>"
                            break;
                        case 'En Mora':
                            return "<h5><span class='badge bg-danger'>  En  Mora  </span></h5>"
                            break;
                    }
                }
            },
            { "defaultContent": "<div class='text-center'><button class='btn btn-success text-white btnFinalizarPago'><i class='fa-solid fa-check'></i></button></div>", "sortable": false }
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
        searchBuilder: {
            columns: [4]
        },
        dom: 'QBfrtilp',
        buttons: [{
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                },
                title: 'Pagos Mora Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7]
                },
                title: 'Pagos Mora Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger',
                orientation: 'landscape',
                PageSize: 'LEGAL',
                customize: function(doc) {
                    doc.styles.tableHeader.fillColor = '#ffffff',
                        doc.styles.tableHeader.color = '#000000',
                        doc.styles.tableBodyOdd.fillColor = '#ffffff',
                        doc.content[1].margin = [0, 0, 0, 0], //left, top, right, bottom
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
            {
                titleAttr: 'Filtrar',
                text: '<i class="fas fa-filter iconWhite"></i> ',
                className: 'btn btn-icon btn-orange br7px filterSB',
                action: function(e, dt, node, config) {
                    esVisible = $("#tablaPagosMora_wrapper>.dtsb-searchBuilder").is(":visible");
                    if(esVisible){
                        $("#tablaPagosMora_wrapper>.dtsb-searchBuilder").hide()
                    } else {
                        $("#tablaPagosMora_wrapper>.dtsb-searchBuilder").show()
                    }
                }
              },
        ]
    });

    tablaPagosMora.searchBuilder.container().prependTo(tablaPagosMora.table().container());
    $("#tablaPagosMora_wrapper>.dtsb-searchBuilder").hide();

    /*---------- FINALIZAR ----------*/
    $(document).on("click", ".btnFinalizarPago", function(){
        fila = $(this).closest("tr");
        data = $('#tablaPagosMora').DataTable().row(fila).data();
        idTurno = data['idTurno'];
        Swal.fire({
          title: '¿Seguro?',
          text: '¿Estás seguro que quieres finalizar este pago?',
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
                  data: { opcion: 13, idTurno: idTurno },
                  success: function() {
                    Swal.fire({
                        title: 'Exito',
                        text: 'El pago se finalizó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then( function(){
                        tablaPagosMora.ajax.reload();
                    })
                  }
              });
            }
          })
      });
  
 
});
