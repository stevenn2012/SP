package logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOCity;
import dao.DAOContact;
import dao.DAOCountry;
import dao.DAOProductService;
import dao.DAOProvider;
import vo.Address;
import vo.City;
import vo.Contact;
import vo.Country;
import vo.ProductService;
import vo.Provider;
import vo.vista.ProviderListJSON;

public class ProviderLogic {

	public static JSONObject getProvidersJSON() {
		JSONObject obj = new JSONObject();
		List<ProviderListJSON> listaJson = new ArrayList<>();
		List<Provider> proveedores = DAOProvider.getProvider();
		List<ProductService> productosServicios = DAOProductService.getProductService();
		List<Contact> contactos = DAOContact.getContact();
		List<Address> direcciones = DAOAddress.getAddress();
		List<City> ciudades = DAOCity.getCities();
		List<Country> paises = DAOCountry.getCountry();
		
		if (proveedores == null || contactos == null || direcciones==null || ciudades==null || paises==null) {
			obj.put("list", "true");
			obj.put("validate", "true");
			obj.put("status", "error al listar los proveedores");
			return obj;
		}else{
			for (int i = 0; i < proveedores.size(); i++) {
				ProviderListJSON providerJson = new ProviderListJSON(proveedores.get(i).getIdProvider(),proveedores.get(i).getNIT() , proveedores.get(i).getName(), proveedores.get(i).getDescription());
				listaJson.add(providerJson);
			}
			for (int i = 0; i < listaJson.size(); i++) {
				for (int j = 0; j < productosServicios.size(); j++) {
					if (productosServicios.get(j).getIdProvider()==listaJson.get(i).getIdProvider()) {
						listaJson.get(i).addProductService(productosServicios.get(j));
					}
				}
				for (int j = 0; j < contactos.size(); j++) {
					if (contactos.get(j).getIdProvider()==listaJson.get(i).getIdProvider() && contactos.get(j).getIdProvider()>0) {
						listaJson.get(i).addContact(contactos.get(j));;
					}
				}
				for (int j = 0; j < direcciones.size(); j++) {
					if (contactos.get(j).getIdProvider()==listaJson.get(i).getIdProvider() && contactos.get(j).getIdProvider()>0) {
						listaJson.get(i).addContact(contactos.get(j));;
					}
				}
			}
			return obj;
		}
	}

}
