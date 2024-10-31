<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
	<h2>Histórico de Turnos</h2>
<!--
   <div class="row">
        <div class="col-lg-1">            
            <button id="btnNuevoTurno" type="button" class="btn btn-info" data-toggle="modal">
                <i class="material-icons">library_add</i>
            </button> 
        </div>
        <div class="col-lg-1">            
            <button id="btnCaja" type="button" class="btn btn-success" data-toggle="modal">
                <i class="material-icons">savings</i>
            </button> 
        </div>     
    </div>
    
    <div class="btn-group">            
        <button id="btnNuevoTurno" type="button" class="btn btn-info" data-toggle="modal">
            <i class="material-icons">library_add</i>
        </button> 
    </div>

    <div class="btn-group">            
        <button id="btnCaja" type="button" class="btn btn-success" data-toggle="modal">
            <i class="material-icons">savings</i>
        </button> 
    </div>-->
</div> 
    <br>  

    <div class="container caja">
        <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaHistorico" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                        	<th>Numero</th>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>                                
                           	<th>Mail</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Dominio</th>
                            <th>Cristal</th>
                            <th>codCristal</th>
                            <th>Compañia</th>
                            <th>Trabajo</th>
                            <th>Descripción</th>
                            <th>Valor</th>
                            <th>Efectivo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
            </div>
        </div>  
    </div>

    <!-- Modal para ver detalles-->
    <div class="modal" id="modalDetalleHist" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="width:40%;margin-left: 450px; margin-top: 100px;">
        <div class="model-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-info" id="headerDetalleHist">
                    <h5 class="modal-title" id="titleDetalleHist"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered table-striped">
                            <tbody>
                                <tr>
                                   <th scope="row">Teléfono</th>
                                   <td id="info0"></td>
                                </tr>
                                <tr>
                                   <th scope="row">Mail</th>
                                   <td id="info1"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Cristal</th>
                                    <td id="info2"></td>
                                </tr>
                                <tr>
                                    <th scope="row">codCristal</th>
                                    <td id="info3"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Compañia</th>
                                    <td id="info4"></td>
                                </tr>
                                <tr>
                                    <th scope="row">Trabajo</th>
                                    <td id="info5"></td>
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

<!--Modal para CRUD Turno
<div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modalForm">
                <h5 class="modal-title" id="titleForm"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formTurno">    
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Fecha</label>
                    <input type="datetime-local" class="form-control" id="fecha">
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre">
                    </div> 
                    </div>    
                </div>
                <div class="row"> 
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Telefono</label>
                    <input type="number" class="form-control" id="telefono">
                    </div>               
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Mail</label>
                    <input type="email" class="form-control" id="mail">
                    </div>
                    </div>    
                </div>
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Marca</label>
                    <input type="text" class="form-control" id="marca">
                    </div>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Modelo</label>
                    <input type="text" class="form-control" id="modelo">
                    </div>
                    </div> 
                </div>  
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Dominio</label>
                    <input type="text" class="form-control" id="dominio">
                    </div>
                    </div> 
                </div> 
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Cristal</label>
                    <input type="text" class="form-control" id="cristal">
                    </div>
                    </div> 
                </div> 
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Compañia</label>
                    
                    <select class="form-control" id="compania">
                        <option id="seleccionada" selected></option>
                        <option value="1">Particulares</option>
                        <option value="2">La Caja</option>
                        <option value="3">Glasscom</option>
                        <option value="4">Fed Pat</option>
                        <option value="5">Común</option>
                        <option value="6">Allianz-Sure-Nacion-Mapfre</option>
                        <option value="7">La Segunda - Sancor</option>
                        <option value="8">San Cristobal</option>
                    </select>
                    </div>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Trabajo</label>
                    
                    <select class="form-control" id="trabajo">
                        <option id="seleccionada2" selected></option>
                        <option value="1">Parabrisas</option>
                        <option value="2">Lunetas</option>
                        <option value="3">Puertas</option>
                        <option value="4">Ventilete / Custodias</option>
                        <option value="5">Cerrajeria</option>
                        <option value="6">Polarizado</option>
                        <option value="7">Sacabollo</option>
                        <option value="8">Telepase</option>
                        <option value="9">Grabado</option>
                        <option value="10">Escobilla</option>
                        <option value="11">Maq lev vidrio</option>
                        <option value="12">Despegar PSAS</option>
                        <option value="13">Pegado espejo</option>
                        <option value="14">Diferencia de Cliente</option>
                        <option value="15">Burlete</option>
                        <option value="16">Seña</option>
                        <option value="17">Pegado en domicilio</option>
                        <option value="18">Mano de Obra</option>
                        <option value="19">Pegamento Salchicha</option>
                        <option value="20">Vidrios a medida</option>
                    </select>
                    </div>
                    </div> 
                </div>  
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Descripcion</label>
                    <input type="text" class="form-control" id="descripcion">
                    </div>
                    </div> 
                </div> 
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Valor</label>
                    <input type="number" step="0.01" class="form-control" id="valor">
                    </div>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-9">
                    <div class="form-group">
                    <label for="" class="col-form-label">Efectivo</label>
                    <input type="checkbox" class="form-control" id="efectivo">
                    </div>
                    </div> 
                </div>               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>
        </form>    
        </div>
    </div>
</div>
-->
<!----------------------------->
</div>
    <!-- End of Main Content -->

    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; MAV Software - 2024</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>-->

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header modalLogout">
                <h5 class="modal-title">¿Listo para salir?</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">Seleccione "Cerrar sesión" a continuación si desea finalizar la sesión.</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <a class="btn btn-primary decorationNone" href="../database/logout.php" role="button" >Cerrar sesión</a>
            </div>
            </div>
        </div>
    </div>

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptListaPrecios.js"></script>

<!-- SweetAlert2 -->
<script src="../libraries/sweetalert2/sweetalert2.all.min.js"></script>

<!-- Fontawesome -->
<script src="../libraries/fontawesome-6.4.0/js/all.min.js" type="text/javascript"></script>

<!-- Bootstrap  -->
<script src="../libraries/bootstrap-5.3.0/js/bootstrap.bundle.min.js"></script>

<!-- datatables JS -->
<script type="text/javascript" src="../libraries/DataTables/datatables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="../libraries/DataTables/DataTables-1.13.4/js/dataTables.bootstrap5.min.js"></script>

<!-- Botones Datatables JS -->
<script src="../libraries/DataTables/Buttons-2.3.6/js/dataTables.buttons.min.js"></script>
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.html5.min.js"></script> 
<script src="../libraries/DataTables/Buttons-2.3.6/js/buttons.print.min.js"></script>
<script src="../libraries/DataTables/JSZip-2.5.0/jszip.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/pdfmake.min.js"></script>    
<script src="../libraries/DataTables/pdfmake-0.1.36/vfs_fonts.js"></script>

</body>
</html>