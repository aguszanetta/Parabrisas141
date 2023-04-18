$(document).ready(function() {
    var opcion = 2;
    var fila;

    tablaStock = $('#tablaStock').DataTable({
        "ajax": {
            "url": "crudStock.php",
            "method": 'POST',
            "data": { opcion: opcion },
            "dataSrc": ""
        },
        "columns": [
            { "data": "codigo", "visible": false },
            { "data": "marca", "sortable": false },
            { "data": "modelo", "sortable": false },
            { "data": "descripcion", "visible": false },
            { "data": "cristal", "sortable": false },
            { "data": "posicion" },
            { "data": "lado" },
            { "data": "color", "visible": false },
            { "data": "cantidad" },
            { "data": "precioFinal" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-success btn-sm btnSumarStock'><i class='material-icons'>add</i></button><button class='btn btn-danger btn-sm btnRestarStock'><i class='material-icons'>remove</i></button><button class='btn btn-info btn-sm btnDetalleStock'><i class='material-icons'>info</i></button></div></div>", "sortable": false }
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
        responsive: "true",
        dom: 'Bfrtilp',
        buttons: [{
                extend: 'excelHtml5',
                exportOptions: {
                    format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                },
                title: 'Stock Parabrisas 141',
                text: '<i class="fas fa-file-excel"></i> ',
                titleAttr: 'Exportar a Excel',
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                },
                title: 'Stock Parabrisas 141',
                text: '<i class="fas fa-file-pdf"></i> ',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend: 'print',
                exportOptions: {
                    format: { header: function(data, column, row) { return data.substring(data.indexOf("value") + 9, data.indexOf("</option")); } },
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                },
                title: 'Stock Parabrisas 141',
                text: '<i class="fa fa-print"></i> ',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            },
        ]
    });

    //Sumar      
    $(document).on("click", ".btnSumarStock", function() {
        fila = $(this).closest("tr");
        data = $('#tablaStock').DataTable().row(fila).data();
        codigo = data['codigo'];
        cantidad = parseInt(data['cantidad']) + 1;
        $.ajax({
            url: "crudStock.php",
            type: "POST",
            datatype: "json",
            data: { codigo: codigo, cantidad: cantidad, opcion: 1 },
            success: function(data) {
                dropDownStock();
            }
        });

    });
    //Restar      
    $(document).on("click", ".btnRestarStock", function() {
        fila = $(this).closest("tr");
        data = $('#tablaStock').DataTable().row(fila).data();
        codigo = data['codigo'];
        cantidad = parseInt(data['cantidad'])
        if (cantidad == 0) {
            Swal.fire({
                title: 'Cantidad en cero',
                text: '¡no se puede restar!',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        } else {
            cantidad = cantidad - 1;
        }
        $.ajax({
            url: "crudStock.php",
            type: "POST",
            datatype: "json",
            data: { codigo: codigo, cantidad: cantidad, opcion: 1 },
            success: function(data) {
                dropDownStock();
            }
        });

    });
    //ModalDetalle     
    $(document).on("click", ".btnDetalleStock", function() {
        fila = $(this).closest("tr");
        data = $('#tablaStock').DataTable().row(fila).data();
        codigo = data['codigo'];
        descripcion = data['descripcion'];
        color = data['color'];
        $("#info00Stock").html(codigo);
        $("#info01Stock").html(descripcion);
        $("#info02Stock").html(color);
        $("#headerDetalle").css("background-color", "#17a2b8");
        $("#headerDetalle").css("color", "white");
        $("#titleDetalle").text("Detalle");
        $('#modalDetalle').modal('show');
    });

    //Cargar marca del desplegable STOCK
    $.ajax({
        type: "POST",
        url: 'crudStock.php',
        datatype: "json",
        data: { opcion: 3 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaMarcaStock").html("<option value=>Marca</option>");
            while (i < datos.length) {
                $("#listaMarcaStock").append("<option value=" + i + ">" + datos[i].marca + "</option>");
                i = i + 1;
            };
        }
    });


});

//Cargar modelo del desplegable STOCK, a partir de marca
function getModeloStock() {
    marca = $("#listaMarcaStock option:selected").text();
    $.ajax({
        type: "POST",
        url: 'crudStock.php',
        datatype: "json",
        data: { marca: marca, opcion: 4 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaModeloStock").html("<option  value=>Modelo</option>");
            $("#listaCristalStock").html("<option  value=>Cristal</option>");
            while (i < datos.length) {
                $("#listaModeloStock").append("<option value=" + i + ">" + datos[i].modelo + "</option>");
                i = i + 1;
            };
        }
    });
};

//Cargar cristal del desplegable STOCK, a partir de modelo
function getMarcaStock() {
    modelo = $("#listaModeloStock option:selected").text();
    $.ajax({
        type: "POST",
        url: 'crudStock.php',
        datatype: "json",
        data: { modelo: modelo, opcion: 5 },
        success: function(data) {
            var i = 0;
            var datos = JSON.parse(data);
            $("#listaCristalStock").html("<option value=>Cristal</option>");
            while (i < datos.length) {
                $("#listaCristalStock").append("<option value=" + i + ">" + datos[i].cristal + "</option>");
                i = i + 1;
            };
        }
    });
};

function dropDownStock() {
    setTimeout(function() {
        marca = $("#listaMarcaStock option:selected").text();
        modelo = $("#listaModeloStock option:selected").text();
        cristal = $("#listaCristalStock option:selected").text();
        if (marca === "Marca") {
            tablaStock.ajax.reload(null, false);
        } else if (marca != "Marca" & modelo == "Modelo" & cristal == "Cristal") { //Filtro por marcca
            $.ajax({
                url: "crudStock.php",
                type: "POST",
                datatype: "json",
                data: { marca: marca, opcion: 6 },
                success: function(data) {
                    var datos = JSON.parse(data);
                    tablaStock.clear().rows.add(datos).draw();
                }
            });
        } else if (marca != "Marca" & modelo != "Modelo" & cristal == "Cristal") { //Filtro por modelo
            $.ajax({
                url: "crudStock.php",
                type: "POST",
                datatype: "json",
                data: { marca: marca, modelo: modelo, opcion: 7 },
                success: function(data) {
                    var datos = JSON.parse(data);
                    tablaStock.clear().rows.add(datos).draw();
                }
            });
        } else if (marca != "Marca" & modelo != "Modelo" & cristal != "Cristal") { //Filtro por cristal
            $.ajax({
                url: "crudStock.php",
                type: "POST",
                datatype: "json",
                data: { marca: marca, modelo: modelo, cristal: cristal, opcion: 8 },
                success: function(data) {
                    var datos = JSON.parse(data);
                    tablaStock.clear().rows.add(datos).draw();
                }
            });
        }
    }, 200);
};