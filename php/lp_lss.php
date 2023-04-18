<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
    <h1>Lista de Precios La Segunda-Sancor</h1>
	<div class="row">
            <div class="table-responsive">        
                <table id="tablaLP-laSegundaSancor" class="table table-striped table-bordered table-condensed" style="width:100%" >
                    <thead class="text-center">
                        <tr>
                            <th>Código</th>
                            <th>
                                <select class="selectTabla" id="listaMarcaLaSegundaSancor" onChange="getModeloLaSegundaSancor(), dropDownLaSegundaSancor();">
                                    <option value=>Marca</option>
                                </select>
                            </th>
                            <th>
                                <select class="selectTabla" id="listaModeloLaSegundaSancor" onChange="getMarcaLaSegundaSancor(), dropDownLaSegundaSancor();">
                                    <option value=>Modelo</option>
                                </select>
                            </th>                                
                            <th>Descripción</th>
                            <th>
                                <select class="selectTabla" id="listaCristalLaSegundaSancor" onChange="dropDownLaSegundaSancor();">
                                    <option value=>Cristal</option>
                                </select>                 
                            </th>
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
<!--Modal para Detalle LP-LaSegunda-Sancor-->
<div class="modal" id="modalDetalle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="width:40%;margin-left: 450px; margin-top: 100px;">
        <div class="model-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info" id="headerDetalle">
                    <h5 class="modal-title" id="titleDetalle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <th scope="row">Código</th>
                                    <td id="info00LPLaSegundaSancor"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Descripción</th>
                                    <td id="info01LPLaSegundaSancor"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Color</th>
                                    <td id="info02LPLaSegundaSancor"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>   
<!----------------------------->

<?php require_once "dash_bottom.php" ?>