$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: 'crudTurnos.php',
        datatype:"json",    
        data:  { opcion: 18 }, 
        success: function(data) {
            var datos = JSON.parse(data);
            for (let i = 0; i < datos.length; i++) {
                $("#listaPrecio").append("<option value=" + datos[i].idListaPrecio + ">" + datos[i].nombre + "</option>");
            } 
        }
    });

    const dt = new DataTransfer();
    let data = new FormData()
    $(document).on("click", "#btnCargarPrecio", function(){
        $("#archivoListaPrecio").click()
    })

    $(document).on("change", "#archivoListaPrecio", function(){
        agregarArchivo(dt, this.files)
    })

    $(document).on("click", ".quitarArchivo", function(){
        let nombre = $(this).prev().text();
        for(let i = 0; i < dt.items.length; i++){
            if(nombre === dt.items[i].getAsFile().name){
                $(this).parents()[2].remove();
                dt.items.remove(i);
                continue;
            }
        }
        
        $("#archivo").prop('files', dt.files)
    })

    /*$(document).on("drop", "#wrapperPrecio", function(e){
        e.preventDefault();
        $("#formPrecio").removeAttr('style');
        agregarArchivo(dt, e.originalEvent.dataTransfer.files)
    })

    $(document).on("dragover", "#wrapperPrecio", function(e){
        e.preventDefault();
        $("#formPrecio").css("background", "#00000024")
    })

    $(document).on("dragleave", "#wrapperPrecio", function(e){
        e.preventDefault();
        $("#formPrecio").removeAttr('style');
    })*/

    $(document).on("submit", "#formPrecio", function(){
        $('#loader').removeClass('hidden')
    })

    $('#formPrecio').submit(function(e){
        e.preventDefault();
        let formData = new FormData(this)

        $.ajax({
            url: "crudPrecios.php",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                Swal.fire({
                    title: 'Exito',
                    text: 'La lista de precios se cargó correctamente',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                }).then( function(){
                    //Return Info sobre Marcas Nuevas - Modelos Nuevos- Cristales Nuevos - Cristales Baja
                    $('#loader').addClass('hidden')
                    console.log(data)
                    datos = JSON.parse(data)
                    $("#info").text("Info - " + $("#listaPrecio :selected").text())

                    marcasNuevas = datos.marcasNuevas
                    if(marcasNuevas.length > 0){
                        for (let i = 0; i < marcasNuevas.length; i++) {
                            $("#marcasNuevas").append("<li>" + marcasNuevas[i] + "</li>");
                        }   
                    }

                    modelosNuevos = datos.modelosNuevos
                    if(modelosNuevos.length > 0){
                        for (let i = 0; i < modelosNuevos.length; i++) {
                            $("#modelosNuevos").append("<li>" + modelosNuevos[i].nombre + " (" +  modelosNuevos[i].marca + ")"+ "</li>");
                        }   
                    }

                    cristalesNuevos = datos.cristalesNuevos
                    if(cristalesNuevos.length > 0){
                        for (let i = 0; i < cristalesNuevos.length; i++) {
                            $("#cristalesNuevos").append("<li>" + cristalesNuevos[i].codigo + "</li>");
                        }
                    }
                    
                    cristalesBaja = datos.cristalesBaja
                    if(cristalesBaja.length > 0){
                        for (let i = 0; i < cristalesBaja.length; i++) {
                            $("#cristalesBaja").append("<li>" + cristalesBaja[i].idCristal + " - " + cristalesBaja[i].codigo + "</li>");
                        }
                    }

                })
            }
        });
      });
})

async function agregarArchivo(dt, files){
    if(files.length > 0){
        nombreOriginal = files.item(0).name
        existe = await existeArchivo(dt, nombreOriginal);
        if(!existe){
            size = files.item(0).size
            if(size < 2*1024*1024){
                extension = nombreOriginal.substring(nombreOriginal.lastIndexOf('.'), nombreOriginal.length) || nombreOriginal
                if(extension == '.xlsx' || extension == '.xls' || extension == '.xlsm' || extension == '.csv'){
                    $("#fileList").append('<div class="uploaded-ListaPrecio"> \
                        <i class="far fa-file-excel"></i> \
                        <div class="file"> \
                            <div class="file__name"> \
                            <p class="nombreArchivo">'+ nombreOriginal +'</p> \
                            <i class="fas fa-times quitarArchivo"></i> \
                            </div> \
                            <div class="progress"> \
                            <div id="Progress" class="progress-bar bg-primary progress-bar-striped" role="progressbar"></div> \
                            </div> \
                        </div> \
                        </div>')
                    dt.items.add(files.item(0))
                } else{
                    Swal.fire({
                        title: '¡Cuidado!',
                        html: nombreOriginal +'<br> Tipo de archivo no permitido',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            }else{
                Swal.fire({
                    title: '¡Cuidado!',
                    html: nombreOriginal +'<br> El archivo es demasiado grande <br> (tamaño máximo 2MB)',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
        }else{
            Swal.fire({
                title: '¡Cuidado!',
                html: nombreOriginal +'<br> El archivo ya fue cargado',
                icon: 'warning',
                confirmButtonText: 'OK'
            })
        }
        $("#listaPrecio").prop('files', dt.files)
    }else {
        $("#listaPrecio").prop('files', dt.files)
    }
}

function existeArchivo(dt, itemNombre){
    if(dt.items.length == 0){
        return false
    } else {
        for(let i = 0; i < dt.items.length; i++){
            if(itemNombre === dt.items[i].getAsFile().name){
                return true
            }
        }
        return false
    }
}