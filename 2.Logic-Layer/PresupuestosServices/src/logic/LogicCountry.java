package logic;

import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOCity;
import dao.DAOCountry;
import vo.Address;
import vo.City;
import vo.Country;


public class LogicCountry {
	
	public static JSONObject getCountriesJSON() {
		List<Country> countries = DAOCountry.getCountry();
		JSONObject obj = new JSONObject();
		if (countries != null) {
			obj.putOnce("countries", countries);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar paises");
			return obj;
		}
	}
	
	public static JSONObject createCountry(Country country) {
		JSONObject obj = new JSONObject();
		List<Country> countries = DAOCountry.getCountry();
		for (int i = 0; i < countries.size(); i++) {
			if(countries.get(i).getName().toLowerCase().equals(country.getName().toLowerCase())){
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "El pais se encontraba previamente en la base de datos.");
				obj.put("idCountry", countries.get(i).getIdCountry());
				obj.put("Nombre", countries.get(i).getName());
				return obj;
			}
		}
		if (DAOCountry.insertCountry(country)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			countries = DAOCountry.getCountry();
			for(int i = 0; i < countries.size(); i++) {
				if (countries.get(i).getName().equals(country.getName())) {
					obj.put("status", "Se ha insertado correctamente el pais.");
					obj.put("idCountry", countries.get(i).getIdCountry());
					obj.put("countryCode", countries.get(i).getCountryCode());
					obj.put("name", countries.get(i).getName());
					break;
				}
			}
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el pais.");
			return obj;
		}
	}

	public static JSONObject deleteCountry(String idCountry) {
		JSONObject obj = new JSONObject();
		List<Address> direcciones = DAOAddress.getAddress();
		List<City>    ciudades    = DAOCity.getCities();
		List<Country> paises      = DAOCountry.getCountry();
		
		if (direcciones!=null && ciudades != null && paises != null) {
			for (int i = 0; i < ciudades.size(); i++) {
				System.out.println(ciudades.get(i).getIdCountry()+" for 1. "+Long.parseLong(idCountry));
				if (ciudades.get(i).getIdCountry()==Long.parseLong(idCountry)) {
					System.out.println(ciudades.get(i).getIdCountry()+" for 1. if 1"+Long.parseLong(idCountry));
					for (int j = 0; j < direcciones.size(); j++) {
						System.out.println(ciudades.get(i).getIdCity()+" for 2. "+direcciones.get(j).getIdCity());
						if (direcciones.get(j).getIdCity()==ciudades.get(i).getIdCity()) {
							if (!DAOAddress.deleteAddress(direcciones.get(j).getIdAddress())) {
								obj.put("validate", "true");
								obj.put("delete", "false");
								obj.put("status", "Error al borrar direccion dentro del pais. Error al acceder a la base de datos");
								return obj;
							}
						}
					}
					if (!DAOCity.deleteCity(ciudades.get(i).getIdCity())) {
						obj.put("validate", "true");
						obj.put("delete", "false");
						obj.put("status", "Error al borrar ciudad dentro del pais. Error al acceder a la base de datos");
						return obj;
					}	
				}
			}
			if (DAOCountry.deleteCountry(Long.parseLong(idCountry))) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Borrado de pais correcto");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error al el pais. Error al acceder a la base de datos");
				return obj;
			}
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "Error al borrar pais. Error al acceder a la base de datos");
			return obj;
		}
	}

	public static Object updateCountry(Country country, long parseLong) {
		// TODO Auto-generated method stub
		return null;
	}
}
