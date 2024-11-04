<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container-fluid">
	<h1>Turnos</h1>

    <div class="row mb-2">
        <div class="col-lg-3">
            <button id="btnCaja" type="button" class="btn btn-secondary btn-icon ph10px" data-toggle="modal">
                <i class="fas fa-piggy-bank"></i>
            </button> 
        </div>       
    </div> 
    
    <div class="row">
            <div class="col-lg-12">
            <div class="table-responsive">     
                <table id="tablaTurnos" class="table table-striped table-bordered table-condensed table-hover">
                    <thead class="text-center">
                        <tr>
                            <th>idTurno</th>
                            <th>Fecha</th>
                            <th>Turno</th>
                            <th>Hora</th>
                            <th>Contacto</th>
                            <th>Telefono</th>
                            <th>Vehiculo</th>
                            <th>Dominio</th>
                            <th>Trabajos</th>
                            <th>Compañia</th>
                            <th>Siniestro</th>
                            <th>Graba</th>
                            <th>Polariza</th>
                            <th>Pago</th>
                            <th>Tipo de Pago</th>
                            <th>N° Factura</th>
                            <th>Cristales A Pedir</th>
                            <th>Foto Antes</th>
                            <th>Foto Despues</th>
                            <th>Realizado Por</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>                
            </div>
            </div>
        </div>  
    
<!--Modal para Turno-->
<div class="modal fade" id="modalTurno" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header modalColor" id="modalTurnoHeader">
        <h5 class="modal-title" id="modalTurnoTitle">Turno</h5>
        <button id="btn-editarTurno" type="button" class="btn text-white-50 ms-auto btn-header"><i class="fa-solid fa-pen-to-square fa-lg"></i></button>
        <button id="btn-finalizarTurno" type="button" class="btn text-white-50 ms-2 btn-header"><i class="fa-solid fa-check fa-lg"></i></button>
        <!--<button type="button" class="btn-close btn-close-white ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"></button>-->
        <button type="button" class="btn text-white-50 ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark fa-xl"></i></button>  
    </div>
      <form id="formTurno" data-estado="" class="form-sample" action="" method="POST">
        <input id="cristales" name="cristales" type="text" value="" hidden>
        <input id="cristalEliminar" name="cristalEliminar" value="" hidden>
        <input id="banderaCristales" name="banderaCristales" value="" hidden>
        <input id="banderaTrabajos" name="banderaTrabajos" value="" hidden>
        <input id="cristalesAPedir" name="cristalesAPedir" value="[]" hidden>
        <div class="modal-body">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="fechaHora" class="form-label text-dark">Fecha y Hora</label>
                            <div class="input-group mb-3">
                                <input id="fechaHora" name="fechaHora" type="datetime-local" class="form-control inputForm" disabled required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="franjaHoraria" class="form-label text-dark">Franja Horaria</label>
                            <div class="input-group mb-3">
                            <select name="franjaHoraria" id="franjaHoraria" class="form-select inputForm" required>
                                    <option value="0">Seleccione</option>
                                    <option value="1">Mañana</option>
                                    <option value="2">Tarde</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="contacto" class="form-label text-dark">Contacto</label>
                            <div class="input-group mb-3">
                                <input id="contacto" name="contacto" type="text" class="form-control inputForm" required>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="telefono" class="form-label text-dark">Teléfono</label>
                            <div class="input-group mb-3">
                                <input id="telefono" name="telefono" type="text" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="dominio" class="form-label text-dark">Dominio</label>
                            <div class="input-group mb-3">
                                <input id="dominio" name="dominio" type="text" class="form-control inputForm text-uppercase">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="empresa" class="form-label text-dark">Compañía</label>
                            <div class="input-group mb-3">
                                <select name="empresa" id="empresa" class="form-select inputForm" required>
                                    <option value="">Compañía</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="marca" class="form-label text-dark">Marca</label>
                            <div class="input-group mb-3">
                                <select name="marca" id="marca" class="form-select inputForm" required>
                                    <option value="">Marca</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="modelo" class="form-label text-dark">Modelo</label>
                            <div class="input-group mb-3">
                                <select name="modelo" id="modelo" class="form-select inputForm" required>
                                    <option value="">Modelo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="cristal" class="form-label text-dark">Cristal</label>
                            <div class="mb-3">
                                <select name="cristal" id="cristal" class="form-select inputForm">
                                    <option value="">Cristal</option>
                                </select>
                                <p id="alertaCristal" class="text-danger text-center dispNone"></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <label for="cantidad" class="form-label text-dark">Cantidad</label>
                        <input id="cantidad" name="cantidad" type="number" min="0" class="form-control inputForm">
                    </div>
                    <div class="col-md-3 pb-3 d-flex align-items-center">
                        <div class="form-check col-md-4">
                            <input class="form-check-input inputForm" type="checkbox" value="" id="otro">
                            <label class="form-check-label text-dark" for="otro">Otro</label>
                        </div>
                        <div id="colImporte" class="col-md-8">
                            <label for="importe" class="form-label text-dark">Importe</label>
                            <input id="importe" name="importe" type="number" step="0.01" min="0" class="form-control inputForm">
                        </div>
                    </div>
                    <div class="col-md-3 pb-3 d-flex align-items-center justify-content-end">
                        <button type="button" id="eliminarCristal" class="btn btn-danger inputForm">Eliminar</button>
                        <button type="button" id="agregarCristal" class="btn btn-success ms-2 inputForm">Agregar</button>
                    </div>
                </div>
                <div class="container mb-3 mxWth">
                    <div class="row">
                        <div class="col-lg-12 p-0">
                            <div class="table-responsive">
                                <table id="tablaCristales" name="tablaCristales" class="table table-striped table-hover">
                                    <thead class="text-center">
                                        <tr class="text-primary">
                                        <th>Código</th>
                                        <th>Descripción</th>
                                        <th>Cantidad</th>
                                        <th>Otro</th>
                                        <th>Importe S/IVA</th>
                                        <th>Importe C/IVA</th>
                                        <th>IdCristal</th>
                                        <th>A Pedir</th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-center">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="trabajo" class="form-label text-dark">Trabajo</label>
                            <div class="input-group mb-3">
                                <select class="form-control inputForm" id="trabajo" multiple="multiple" required>
                                    <option value="2">Cerradura</option>
                                    <option value="6">Grabado</option>
                                    <option value="7">Lunetas</option>
                                    <option value="10">Parabrisas</option>
                                    <option value="14">Polarizado</option>
                                    <option value="15">Puertas</option>
                                    <option value="19">Ventilete / Custodias</option>
                                    <option value="21">Otros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="importeTrabajo" class="form-label text-dark">Importe Trabajo</label>
                            <div class="input-group mb-3">
                                <input id="importeTrabajo" name="importeTrabajo" type="number" step="0.01" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="" class="form-label text-dark">Observacion</label>
                            <textarea class="form-control inputForm" id="observacion" rows="1"></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="pago" class="form-label text-dark">Pagó</label>
                            <div class="form-check d-flex justify-content-center">
                                <input class="form-check-input checkForm inputForm" type="checkbox" id="esPago" name="esPago">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="tipo" class="form-label text-dark">Tipo de Pago</label>
                            <div class="input-group mb-3">
                            <select name="tipoPago" id="tipoPago" class="form-select inputForm">
                                    <option value="0">Tipo</option>
                                    <option value="1">Efectivo</option>
                                    <option value="2">Débito</option>
                                    <option value="3">Crédito</option>
                                    <option value="4">Mercado Pago</option>
                                    <option value="5">Transferencia</option>
                                    <option value="6">Dolares</option>
                                    <option value="7">Otros</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="fechaPago" class="form-label text-dark">Fecha de Pago</label>
                            <div class="input-group mb-3">
                                <input id="fechaPago" name="fechaPago" type="date" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="fechaEntrega" class="form-label text-dark">Fecha de Entrega</label>
                            <div class="input-group mb-3">
                                <input id="fechaEntrega" name="fechaEntrega" type="date" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="factura" class="form-label text-dark">N° Factura</label>
                            <div class="input-group mb-3">
                                <input id="numFactura" name="numFactura" type="text" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="siniestro" class="form-label text-dark">Siniestro</label>
                            <div class="input-group mb-3">
                                <input id="siniestro" name="siniestro" type="text" class="form-control inputForm">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="empleado" class="form-label text-dark">Realizado Por</label>
                            <select name="empleado" id="empleado" class="form-select inputForm" required>
                                <!--<option value="">Empleeado</option>-->
                            </select>
                        </div>
                    </div>
                </div>
                <div id="contentArchivos">
                </div>
                <input id="archivo" name="archivo" class="file-input" type="file" accept=".pdf, .jpg, .jpeg, .png, .tif" multiple="multiple" hidden="">
            </div>
        </div>
        <div class="modal-footer">
            <button id="btn-eliminarTurno" type="button" class="btn btn-danger me-auto">Eliminar</button>
            <button id="btn-ok" type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            <button type="button" class="btn btn-secondary btn-editar" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-primary btn-editar">Guardar</button>
        </div>
      </form>  
    </div>
  </div>
</div>
<!--Modal Caja para Turno-->
<div class="modal fade" id="modalCaja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-md">
    <div class="modal-content">
      <div class="modal-header" id="modalCajaHeader">
        <h5 class="modal-title" id="modalCajaTitle">Caja</h5>
        <button type="button" class="btn-close btn-close-white ms-2 btn-header" data-bs-dismiss="modal" aria-label="Close"></button> 
    </div>  
        <div class="modal-body">
            <div class="form-group">
                <select name="mes" id="mes" class="form-select">
                    <option value="">Seleccione Mes</option>
                    <option value="1">Enero</option>
                    <option value="2">Febrero</option>
                    <option value="3">Marzo</option>
                    <option value="4">Abril</option>
                    <option value="5">Mayo</option>
                    <option value="6">Junio</option>
                    <option value="7">Julio</option>
                    <option value="8">Agosto</option>
                    <option value="9">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                </select>
            </div>
            <div class="mt-3">
                <h2><span id="totalMes" class="badge bg-gradient-naranja"></span><h2>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
        </div>
    </div>
  </div>
</div>
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
</div>

<!-- Jquery -->
<script src="../libraries/jquery/jquery-3.6.4.min.js"></script>

<!-- jsPDF y AutoTable -->
<script src="../libraries/jsPDF-AutoTable/jspdf.umd.min.js"></script>
<script src="../libraries/jsPDF-AutoTable/jspdf.plugin.autotable.min.js"></script>

<!-- Custom Script -->
<script src="../js/scriptPanel.js"></script>
<script src="../js/template.js"></script>
<script src="../js/hoverable-collapse.js"></script>
<script type="text/javascript" src="../js/scriptTurnos.js"></script>
<!--<script type="text/javascript" src="../js/script.js"></script>-->

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

<!-- Search Builder Datatables JS -->
<script src="../libraries/DataTables/SearchBuilder-1.4.2/js/dataTables.searchBuilder.min.js"></script>
<script src="../libraries/DataTables/SearchBuilder-1.4.2/js/searchBuilder.bootstrap5.min.js"></script>
<script src="../libraries/DataTables/DateTime-1.4.0/js/dataTables.dateTime.min.js"></script>

<!-- MomentJs -->
<script src="../libraries/moment/moment-with-locales.js"></script>

<!-- Select 2 -->
<script src="../libraries/select2/dist/js/select2.min.js"></script>

<!-- LightBox 2 -->
<script src="../libraries/lightbox2-2.11.3/dist/js/lightbox.js"></script>

</body>
</html>