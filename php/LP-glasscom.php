<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container">
    <h1>Lista de Precios Glasscom</h1>
	<div class="row">
            <div class="table-responsive">        
                <table id="tablaLP-glasscom" class="table table-striped table-bordered table-condensed" style="width:100%" >
                    <thead class="text-center">
                        <tr>
                            <th>Código</th>
                            <th>
                                <select class="selectTabla" id="listaMarcaGlasscom" onChange="getModeloGlasscom(), dropDownGlasscom();">
                                    <option value=>Marca</option>
                                </select>
                            </th>
                            <th>
                                <select class="selectTabla" id="listaModeloGlasscom" onChange="getMarcaGlasscom(), dropDownGlasscom();">
                                    <option value=>Modelo</option>
                                </select>
                            </th>                                
                            <th>Descripción</th>
                            <th>
                                <select class="selectTabla" id="listaCristalGlasscom" onChange="dropDownGlasscom();">
                                    <option value=>Cristal</option>
                                </select>                 
                            </th>
                            <th>Posición</th>
                            <th>Lado</th>  
                            <th>Color</th>
                            <th>Precio S/IVA</th>
                            <th>Instalación S/IVA</th>
                            <th>Total S/IVA</th>
                            <th>Descueto 5% S/IVA</th>
                            <th>Precio Glasscom</th>
                            <th>IVA</th>
                            <th>Final con IVA Glasscom</th>
                    <!--    <th>Detalles</th> -->
                            <th>Precios</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
    </div>  
</div>
<!--Modal para Detalle LP-Glasscom-->
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
                                    <td id="info00LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Descripción</th>
                                    <td id="info01LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Color</th>
                                    <td id="info02LPGlasscom"></td>
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

<!--Modal para Precio LP-Glasscom-->
<div class="modal" id="modalPrecio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="width:40%;margin-left: 450px; margin-top: 100px;">
        <div class="model-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info" id="headerPrecio">
                    <h5 class="modal-title" id="titlePrecio"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <th scope="row">Precio S/IVA</th>
                                    <td id="info03LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Instalación S/IVA</th>
                                    <td id="info04LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Total S/IVA</th>
                                    <td id="info05LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Descueto 5% S/IVA</th>
                                    <td id="info06LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Precio Glasscom</th>
                                    <td id="info07LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">IVA</th>
                                    <td id="info08LPGlasscom"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Final con IVA Glasscom</th>
                                    <td id="info09LPGlasscom"></td>
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