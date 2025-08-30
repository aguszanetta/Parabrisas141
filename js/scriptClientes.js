$(document).ready(function() {

    var idCliente = '';
    var idDomicilio = '';
    tablaClientes = $('#tablaClientes').DataTable({
        "ajax": {
            "url": "crudClientes.php",
            "method": 'POST',
            "data": { opcion: 1 },
            "dataSrc": "",
            beforeSend: function() {
                $('#loader').removeClass('hidden')
            },
            complete: function() {
                $('#loader').addClass('hidden')
            },
        },
        "columns": [
            { "data": "idCliente" },
            { "data": "razonSocial" },
            { "data": "domicilio" },
            { "data": "telefono" },
            { "data": "email"},
            { "data": "contactos" },
            { "data": "cuitCuil" },
            { "data": "condicionLegal" },
            {   
                "data": "fechaAlta",
                "type": "moment- DD-MM-YYYY",
                "width": "10%",
                render: function(data) {
                  return moment(data, 'YYYY-MM-DD').format('DD-MM-YYYY');
                }
            },
            { "data": "observaciones" },
            { "data": "estado" },
            { "data": "domicilioID", "visible": false },
            { "data": "idLocalidad", "visible": false },
            { "data": "idCondicionLegal", "visible": false },
            { "data": "contacto1", "visible": false },
            { "data": "contacto2", "visible": false },
            { "data": "calle", "visible": false },
            { "data": "numero", "visible": false },
            { "data": "piso", "visible": false },
            { "data": "depto", "visible": false },
            { "data": "referencia", "visible": false },
            { "data": "codPostal", "visible": false },
            { "defaultContent": "<div class='text-center'> \
                    <div class='btn-group'> \
                        <button class='btn btn-primary btn-editarCliente'> \
                            <i class='fas fa-pen-to-square'></i> \
                        </button> \
                        <button class='btn btn-danger btn-bajaCliente'> \
                            <i class='fas fa-trash'></i> \
                        </button> \
                    </div> \
                </div>",
                "sortable": false, 
                "width": "7%" 
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
        },
        dom: 'QBfrtilp',
        buttons: [
            {
                titleAttr: 'Agregar Cliente',
                text: '<i class="fas fa-plus"></i> ',
                className: 'btn btn-orange btn-icon br7px',
                attr: {
                  id: 'btn-AltaCliente'
                }
              },
              {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    format:{
                        header: function ( data, columnIdx ) {
                            if(columnIdx==2){
                                return "Marca"
                            }else if(columnIdx==3){
                                return "Modelo"
                            }else if(columnIdx==4){
                                return "Cristal"
                            }else{
                                return data
                            }
                        }}
                },
                title: 'Stock Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    format:{
                    header: function ( data, columnIdx ) {
                        if(columnIdx==2){
                            return "Marca"
                        }else if(columnIdx==3){
                            return "Modelo"
                        }else if(columnIdx==4){
                            return "Cristal"
                        }else{
                            return data
                        }
                    }}
                },
                title: 'Stock Parabrisas 141',
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

      
    /*---------- RESET MODAL CUANDO CIERRA ----------*/
    $("#modalCliente").on("hidden.bs.modal", function(){
        $("#formCliente").trigger("reset");
        idCliente = ''
      });
    
    
    /*---------- ALTA ----------*/
    $(document).on('click', "#btn-AltaCliente", function(info) {
        tipoForm="alta";
        $(".inputForm").prop("disabled", false);
        $("#modalClienteHeader").css("background-color", "#d5693b");
        $("#modalClienteTitle").text("Alta Clientes");
        $("#modalCliente").modal('show');
    });

    /*---------- EDITAR ----------*/     
    $(document).on('click',".btn-editarCliente", function(event, info) {
        tipoForm="editar";
        $(".inputForm").prop("disabled", false);
        fila = $(this).closest("tr");
        data = $('#tablaClientes').DataTable().row(fila).data();
        idCliente = data['idCliente'];
        idDomicilio = data.domicilioID;
        $("#razonSocial").val(data.razonSocial);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        $("#contacto1").val(data.contacto1);
        $("#contacto2").val(data.contacto2);
        $("#cuitCuil").val(data.cuitCuil);
        $("#condicionLegal").val(data.idCondicionLegal);
        $("#observacion").val(data.observaciones);
        $("#calle").val(data.calle);
        $("#numero").val(data.numero);
        $("#piso").val(data.piso);
        $("#departamento").val(data.depto);
        $("#codigoPostal").val(data.codPostal);
        $("#referencia").val(data.referencia);
        $("#localidad").val(data.idLocalidad);

        
        $("#modalClienteHeader").css("background-color", "#0b5ed7");
        $("#modalClienteTitle").text("Editar Cliente");
        $("#modalCliente").modal('show');
    });

    /*---------- FORMULARIO ----------*/
    $('#formCliente').submit(function(e){
        e.preventDefault();
        var razonSocial = $("#razonSocial").val();
        var telefono = $("#telefono").val();
        var email = $("#email").val();
        var contacto1 = $("#contacto1").val();
        var contacto2 = $("#contacto2").val();
        var cuitCuil = $("#cuitCuil").val();
        var condicionLegalID = $("#condicionLegal").val();
        var observacion = $("#observacion").val();
        var calle = $("#calle").val();
        var numero = $("#numero").val();
        var piso = $("#piso").val();
        var departamento = $("#departamento").val();
        var codigoPostal = $("#codigoPostal").val();
        var referencia = $("#referencia").val();
        var localidadID = $("#localidad").val();
        
        if(tipoForm == 'alta') {
            $.ajax({
                url: "crudClientes.php",
                type: "POST",
                datatype: "json",
                data: {
                    opcion: 2,
                    razonSocial: razonSocial,
                    telefono: telefono,
                    email: email,
                    contacto1: contacto1,
                    contacto2: contacto2,
                    cuitCuil: cuitCuil,
                    condicionLegalID: condicionLegalID,
                    observaciones: observacion,
                    calle: calle,
                    numero: numero,
                    piso: piso,
                    depto: departamento,
                    codPostal: codigoPostal,
                    referencia: referencia,
                    localidadID: localidadID
                },
                success: function(data) {
                    Swal.fire({
                        title: 'Exito',
                        text: 'El cliente se cargó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then( function(){
                        $('#modalCliente').modal('hide');
                        $("#tablaClientes").DataTable().ajax.reload(null, true);
                    })
                }
            });
        } else if (tipoForm == 'editar'){
            Swal.fire({
            title: '¿Seguro?',
            text: '¿Estás seguro que quieres editar este cliente?',
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
                    url: "crudClientes.php",
                    type: "POST",
                    datatype: "json",
                    data: { 
                        opcion: 3,
                        idCliente: idCliente,
                        razonSocial: razonSocial,
                        telefono: telefono,
                        email: email,
                        contacto1: contacto1,
                        contacto2: contacto2,
                        cuitCuil: cuitCuil,
                        observaciones: observacion,
                        condicionLegalID: condicionLegalID,
                        calle: calle,
                        numero: numero,
                        piso: piso,
                        depto: departamento,
                        codPostal: codigoPostal,
                        referencia: referencia,
                        localidadID: localidadID,
                        idDomicilio: idDomicilio
                    },
                    success: function(data) {
                    console.log(data)
                    Swal.fire({
                        title: 'Exito',
                        text: 'El cliente se editó correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        }).then( function(){
                        $('#modalCliente').modal('hide');
                        $("#tablaClientes").DataTable().ajax.reload(null, true);
                    })
                    }
                });
                }
            })
        }
    });


    /*---------- BAJA ----------*/
    $(document).on("click", ".btn-bajaCliente", function(){
        fila = $(this).closest("tr");
        data = $('#tablaClientes').DataTable().row(fila).data();
        idCliente = data['idCliente'];
        Swal.fire({
        title: '¿Seguro?',
        text: '¿Estás seguro que quieres dar de baja este cliente?',
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
                url: "crudClientes.php",
                type: "POST",
                datatype: "json",
                data: { 
                    opcion: 6, 
                    idCliente: idCliente, 
                },
                success: function() {
                    Swal.fire({
                        title: 'Exito',
                        text: 'El cliente se dió de baja correctamente',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        }).then( function(){
                        $('#modalCliente').modal('hide');
                        $("#tablaClientes").DataTable().ajax.reload(null, true);
                    })
                }
            });
            }
        })
    })

    /*-------CARGAR DESPLEGABLES CONDICION LEGAL - LOCALIDAD -------*/
    
    $.ajax({
      type: "POST",
      url: 'crudClientes.php',
      datatype:"json",    
      data:  { opcion: 4 }, 
      success: function(data) {
          var datos = JSON.parse(data);
          for (let i = 0; i < datos.length; i++) {
              $("#condicionLegal").append("<option value=" + datos[i].idCondicionLegal + ">" + datos[i].tipo + "</option>");
          } 
      }
    });
    
    $.ajax({
      type: "POST",
      url: 'crudClientes.php',
      datatype:"json",    
      data:  { opcion: 5 }, 
      success: function(data) {
          var datos = JSON.parse(data);
          for (let i = 0; i < datos.length; i++) {
              $("#localidad").append("<option value=" + datos[i].idLocalidad + ">" + datos[i].nombre + "</option>");
          } 
      }
    });

});
