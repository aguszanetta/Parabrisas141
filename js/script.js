$(function(){
    $(document).on("change", "#marca", function() {
        marcaID = $("#marca option:selected").val();
        $("#modelo").html("<option value=>Modelo</option>");
        $("#cristal").html("<option value=>Cristal</option>");
        $("#alertaCristal").hide();
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
        $("#alertaCristal").hide();
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
      });
})