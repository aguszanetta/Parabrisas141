<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Lista de Precios Allianz-Sura-Nacion-Mapfre</h1>
	<div class="row">
            <div class="table-responsive">        
                <table id="tablaLP" data-empresa="asnm" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>Código</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Cristal</th>
                            <th>Descripcion</th>
                            <th>Posición</th>
                            <th>Lado</th>  
                            <th>Color</th>
                            <th>Precio S/IVA</th>
                            <th>Instalación S/IVA</th>
                            <th>Total S/IVA</th>
                            <th>Total C/IVA</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
    </div>  
</div>
<!--Modal para Detalle LP-Allianz-Sura-Nacion-Mapfre-->
<div class="modal fade" id="modalDetalle" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header modalDetalle">
        <h5 class="modal-title" id="titleDetalle">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Código</th>
                        <td id="info00"></td>
                    </tr>
                    <tr>
                        <th scope="row">Descripción</th>
                        <td id="info01"></td>
                    </tr>
                    <tr>
                        <th scope="row">Color</th>
                        <td id="info02"></td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
<!----------------------------->

<?php require_once "dash_bottom.php" ?>