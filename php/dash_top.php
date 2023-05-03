<?php
    session_start();
    if(!isset($_SESSION['s_usuario'])) {
        header("Location: login.php");
    }
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Parabrisas 141</title>
    <link rel="icon" rel="icon" type="image/x-icon" href="../img/favicon.ico">
    
    <!-- Custom Fonts-->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <!-- Fontawesome -->
    <link rel="stylesheet" type="text/css" href="../libraries/fontawesome-6.4.0/css/all.min.css" >
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="../libraries/bootstrap-5.3.0/css/bootstrap.min.css" >
    <!-- Custom style-->
    <link href="../css/stylesPanel.css" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet"> 
    <!--SweetAlert2-->
    <link rel="stylesheet" href="../libraries/sweetalert2/sweetalert2.min.css">
    
    <!--Datables CSS básico -->
    <link rel="stylesheet" type="text/css" href="../libraries/DataTables/datatables.min.css"/>
    <!--Datables estilo bootstrap 5 CSS -->
    <link rel="stylesheet"  type="text/css" href="../libraries/DataTables/DataTables-1.13.4/css/dataTables.bootstrap5.min.css">
    <!--BootstrapMultiselect 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/css/bootstrap-multiselect.css">-->

    <!-- Select 2 -->
    <link rel="stylesheet" type="text/css" href="../libraries/select2/dist/css/select2.min.css"/>
    <link rel="stylesheet" href="../libraries/select2/dist/css/select2-bootstrap-5-theme.min.css" />

    <!-- Lightbox 2 -->
    <link rel="stylesheet" type="text/css" href="../libraries/lightbox2-2.11.3/dist/css/lightbox.css"/>

</head>

<body id="page-top" class="sidebar-icon-only">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul id="sidebar" class="navbar-nav bg-gradient-naranja align-items-center sidebar sidebar-dark accordion toggled" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../index.html">
                <div class="sidebar-brand-icon">
                    <img id="logoParabrisas" class="img-profile" src="../img/imagotipo-parabrisas-dashboard.svg" style="height: 3em">
                </div>
                <div class="sidebar-brand-text mx-3">Parabrisas</div>
            </a>
            <!-- Divider -->
            <hr class="dividerPanel my-0 mb-2">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item mb-1">
                <a class="nav-link" href="panel.php">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span class="menu-title">Panel</span>
                </a>
            </li>

            <!-- Nav Item - Pages Collapse Menu 
            <li class="nav-item mb-1">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-list-ol"></i>
                    <span class="menu-title" >Turnos</span>
                    <i class="fa-solid fa-angle-down"></i>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <a class="collapse-item" href="turnos.php">Nuevo Turno</a>
                        <a class="collapse-item" href="historico.php">Historico</a>
                    </div>
                </div>
            </li>-->

            <li class="nav-item mb-1">
                <a id="turnosNav" class="nav-link collapsed" data-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#dummy-target" 
                aria-expanded="false" aria-controls="collapseTurnos">
                    <i class="fas fa-list-ol"></i>
                    <span class="menu-title">Turnos</span>
                </a>
                <div id="collapseTurnos" class="collapse m-01rem">
                    <ul class="nav flex-column">
                        <li class="nav-item"> <a class="nav-link subitem" href="turnos.php">• Nuevo Turno</a></li>
                        <li class="nav-item"> <a class="nav-link subitem" href="pagosMora.php">• Pagos Mora</a></li>
                    </ul>
                </div>
            </li>

            <!--<li class="nav-item mb-1">
                <a class="nav-link collapsed" data-toggle="collapse" data-target="#collapseTwo" href="#" aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-list-ol"></i>
                    <span class="menu-title">Turnos</span>
                </a>
                <div class="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <ul class="nav flex-column sub-menu collapse-inner rounded">
                        <li class="nav-item"> <a class="nav-link" href="turnos.php">Nuevo Turno</a></li>
                        <li class="nav-item"> <a class="nav-link" href="historico.php">Historico</a></li>
                    </ul>
                </div>
            </li>-->

            <!-- Nav Item - Charts -->
            <li class="nav-item mb-1">
                <a class="nav-link" href="stock.php">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="menu-title" >Stock</span>
                </a>
            </li>

            <!-- Nav Item - Charts -->
            <li class="nav-item mb-1">
                <a class="nav-link" href="aPedir.php">
                    <i class="fa-solid fa-truck-fast"></i>
                    <span class="menu-title" >A Pedir</span>
                </a>
            </li>

             <!-- Nav Item - Pages Collapse Menu 2-->
            <li class="nav-item mb-1">
                <a id="lpNav" class="nav-link collapsed" data-toggle="collapse" data-bs-toggle="collapse" data-bs-target="#dummy-target" 
                aria-expanded="false" aria-controls="collapseLp">
                <i class="fas fa-clipboard-list"></i>
                    <span class="menu-title">Lista de Precios</span>
                </a>
                <div id="collapseLp" class="collapse m-01rem">
                    <ul class="nav flex-column">
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_particulares.php">• Particulares</a></li>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_laCaja.php">• La Caja</a></li>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_glasscom.php">• Glasscom</a>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_fedPat.php">• Fed Pat</a>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_comun.php">• Común</a>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_asnm.php">• A-S-N-M</a>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_lss.php">• La Segunda - Sancor</a>
                        <li class="nav-item"> <a class="nav-link subitem" href="lp_sanCristobal.php">• San Cristobal</a>
                    </ul>
                </div>
            </li>
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <div id="loader" class="loading loading--full-height hidden"></div>
            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                <div id="sidebarToggle" data-toggle="minimize" ><i class="fa-solid fa-bars"></i></div>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <!-- Nav Item - User Information -->
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small"><?php echo $_SESSION["s_usuario"];?></span>
                                <img class="img-profile rounded-circle"
                                    src="../img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
                
                <!-- End of Topbar -->
