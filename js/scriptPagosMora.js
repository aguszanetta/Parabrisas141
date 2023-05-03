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
        },
        //responsive: "true",
        dom: 'Bfrtilp',
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
        ]
    });

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
