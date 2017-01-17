//http://www.danstools.com/javascript-obfuscate/index.php
//pagina inicial de la capa de presentacion
var indexPage = "http://localhost/Proyects/SantaPublicidad/WebApp/";
//roll de administrador
var rollAdmin = 'Gerencia';
//paginas permitidas a usuarios diferentes de gerencia
var OperatorFoldersAllowed = [indexPage+'pages/Proyect/', indexPage+'pages/User/MyUser/'];
//pagina webservices
var page = "http://localhost:8080";
//AppLoginAuthentication - webservices de login y autenticacion
var loginService = page+"/WebServicesPresupuestos/AppLoginAuthentication/login";
var validateLogin = page+"/WebServicesPresupuestos/AppLoginAuthentication/validation";
var logoutService = page+"/WebServicesPresupuestos/AppLoginAuthentication/logout";
//AppUsersCRUD - CRUD de usuarios
var createUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/create";
var userList = page+"/WebServicesPresupuestos/AppUsersCRUD/list";
var editUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/update";
var deleteUserService = page+"/WebServicesPresupuestos/AppUsersCRUD/delete";
//AppAreaCRUD - CRUD de areas
var createAreaService = page+"/WebServicesPresupuestos/AppAreaCRUD/create";
var areaList = page+"/WebServicesPresupuestos/AppAreaCRUD/list";
var editAreaService = page+"/WebServicesPresupuestos/AppAreaCRUD/update";
var deleteAreaService = page+"/WebServicesPresupuestos/AppAreaCRUD/delete";
//AppRollCRUD - CRUD de roles
var rollList = page+"/WebServicesPresupuestos/AppRollCRUD/list";
//AppProviderCRUD - CRUD de proveedores
var createProviderService = page+'/WebServicesPresupuestos/AppProviderCRUD/create';
var providersList = page+"/WebServicesPresupuestos/AppProviderCRUD/list";
var editProviderService = page+'/WebServicesPresupuestos/AppProviderCRUD/update';
var deleteProviderService = page+'/WebServicesPresupuestos/AppProviderCRUD/delete';
//AppCountryCRUD - CRUD de paises
var createCountryService = page+'/WebServicesPresupuestos/AppCountryCRUD/create';
var countryListService = page+'/WebServicesPresupuestos/AppCountryCRUD/list';
var editCountryService = page+'/WebServicesPresupuestos/AppCountryCRUD/update';
var deleteCountryService = page+'/WebServicesPresupuestos/AppCountryCRUD/delete';
//AppCityCRUD - CRUD de ciudades
var createCityService = page+'/WebServicesPresupuestos/AppCityCRUD/create';
var citysListService = page+'/WebServicesPresupuestos/AppCityCRUD/list';
var editCitysService = page+'/WebServicesPresupuestos/AppCityCRUD/update';
var deleteCityService = page+'/WebServicesPresupuestos/AppCityCRUD/delete';
//AppAddressCRUD - CRUD de direcciones
var createAddressService = page+'/WebServicesPresupuestos/AppAddressCRUD/create';
var listAddressService = page+'/WebServicesPresupuestos/AppAddressCRUD/list';
var editAddressService = page+'/WebServicesPresupuestos/AppAddressCRUD/update';
var deleteAddressService = page+'/WebServicesPresupuestos/AppAddressCRUD/delete';
//AppContactCRUD - CRUD de contactos
var createContactService = page+'/WebServicesPresupuestos/AppContactCRUD/create';
var listContactService = page+'/WebServicesPresupuestos/AppContactCRUD/list';
var editContactService = page+'/WebServicesPresupuestos/AppContactCRUD/update';
var deleteContactService = page+'/WebServicesPresupuestos/AppContactCRUD/delete';
//AppProductServiceCRUD - CRUD de productos y servicios
var createProductServiceService = page+'/WebServicesPresupuestos/AppProductServiceCRUD/create';
var listProductServiceService = page+'/WebServicesPresupuestos/AppProductServiceCRUD/list';
var editProductServiceService = page+'/WebServicesPresupuestos/AppProductServiceCRUD/update';
var deleteProductServiceService = page+'/WebServicesPresupuestos/AppProductServiceCRUD/delete';
//CRUD de clientes
var createclientService = page+"/WebServicesPresupuestos/AppClientCRUD/create";
var listClientService = page+"/WebServicesPresupuestos/AppClientCRUD/list";
var editClientService = page+"/WebServicesPresupuestos/AppClientCRUD/update";
var deleteClientService = page+"/WebServicesPresupuestos/AppClientCRUD/delete";