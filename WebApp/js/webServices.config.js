//http://www.danstools.com/javascript-obfuscate/index.php
//pagina inicial de la capa de presentacion
var indexPage = "http://localhost/Proyects/SantaPublicidad/WebApp/";
//roll de administrador
var rollAdmin = 'Gerencia';
//paginas permitidas a usuarios diferentes de gerencia
var OperatorFoldersAllowed = [indexPage+'Proyect/'];
//pagina webservices
var page = "http://localhost:8080";
//AppLoginAuthentication - webservices de login y autenticacion
var loginService = page+"/WebServicesPresupuestos/AppLoginAuthentication/login";
var validateLogin = page+"/WebServicesPresupuestos/AppLoginAuthentication/validation";
var logoutService = page+"/WebServicesPresupuestos/AppLoginAuthentication/logout";
//AppUsersCRUD - CRUD de usuarios
var createUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/create";
var editUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/update";
var deleteUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/delete";
var userList = page+"/WebServicesPresupuestos/AppUsersCRUD/list";
//AppAreaCRUD - CRUD de areas
var areaList = page+"/WebServicesPresupuestos/AppAreaCRUD/list";
var createAreaService = page+"/WebServicesPresupuestos/AppAreaCRUD/create";
//AppRollCRUD - CRUD de roles
var rollList = page+"/WebServicesPresupuestos/AppRollCRUD/list";
//AppProviderCRUD - CRUD de proveedores
var providersList = page+"/WebServicesPresupuestos/AppProviderCRUD/list";
var createProviderService = page+'/WebServicesPresupuestos/AppProviderCRUD/create';
var deleteProviderService = page+'/WebServicesPresupuestos/AppProviderCRUD/delete';
//AppCountryCRUD - CRUD de paises
var createCountryService = page+'/WebServicesPresupuestos/AppCountryCRUD/create';
var countryListService = page+'/WebServicesPresupuestos/AppCountryCRUD/list';
//AppCityCRUD - CRUD de ciudades
var citysListService = page+'/WebServicesPresupuestos/AppCityCRUD/list';
var createCityService = page+'/WebServicesPresupuestos/AppCityCRUD/create';
//AppAddressCRUD - CRUD de direcciones
var createAddressService = page+'/WebServicesPresupuestos/AppAddressCRUD/create';
//AppContactCRUD - CRUD de contactos
var createContactService = page+'/WebServicesPresupuestos/AppContactCRUD/create';
//AppProductServiceCRUD - CRUD de productos y servicios
var createProductServiceService = page+'/WebServicesPresupuestos/AppProductServiceCRUD/create';
//CRUD de clientes
var clientList = page+"/WebServicesPresupuestos/"; //falta
