<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Lista de Precios Allianz-Sura-Nacion-Mapfre</h1>
	<div class="row">
            <div class="table-responsive">        
                <table id="tablaLP-allianzSuraNacionMapfre" class="table table-striped table-bordered table-condensed" style="width:100%" >
                    <thead class="text-center">
                        <tr>
                            <th>Código</th>
                            <!--<th>
                                <select class="selectTabla" id="listaMarcaASNM" onChange="getModeloASNM(), dropDownASNM();">
                                    <option value=>Marca</option>
                                </select>
                            </th>
                            <th>
                                <select class="selectTabla" id="listaModeloASNM" onChange="getMarcaASNM(), dropDownASNM();">
                                    <option value=>Modelo</option>
                                </select>
                            </th>                                
                            <th>Descripción</th>
                            <th>
                                <select class="selectTabla" id="listaCristalASNM" onChange="dropDownASNM();">
                                    <option value=>Cristal</option>
                                </select>                 
                            </th>-->
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Cristal</th>
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
<!--Modal para Detalle LP-ASNM-->
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
                        <th scope="row">Descripción</th>
                        <td id="info00LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Posición</th>
                        <td id="info01LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Lado</th>
                        <td id="info02LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Color</th>
                        <td id="info03LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Precio Sin Iva</th>
                        <td id="info04LP"></td>
                    </tr>
                    <tr>
                        <th scope="row">Instalación Sin Iva</th>
                        <td id="info05LP"></td>
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