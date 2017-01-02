package logic;

import java.util.List;
import org.json.JSONObject;
import dao.DAOCity;
import vo.City;


public class LogicCity {

	public static JSONObject getCitiesJSON() {
			List<City> cities = DAOCity.getCities();
			JSONObject obj = new JSONObject();
			if (cities != null) {
				obj.putOnce("cities", cities);
				obj.put("list", "true");
				obj.put("validate", "true");
				return obj;
			}else{
				obj.put("validate", "true");
				obj.put("list", "false");
				obj.put("status", "Error en listar ciudades");
				return obj;
			}
	}

	public static Object createCity(City city) {
		JSONObject obj = new JSONObject();
		List<City> cities = DAOCity.getCities();
		if (cities==null) {
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "error en base de datos.");
			return obj;
		}
		for (int i = 0; i < cities.size(); i++) {
			if(cities.get(i).getName().toLowerCase().equals(city.getName().toLowerCase())){
				obj.put("validate", "true");
				obj.put("insert", "false");
				obj.put("status", "La ciudad se encontraba previamente en la base de datos.");
				obj.put("idCity", cities.get(i).getIdCity());
				obj.put("Nombre", cities.get(i).getName());
				return obj;
			}
		}
		if (DAOCity.insertCity(city)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			cities = DAOCity.getCities();
			if (cities==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id de ciudad.");
				return obj;
			}
			for(int i = 0; i < cities.size(); i++) {
				if (cities.get(i).getName().toLowerCase().equals(city.getName().toLowerCase())) {
					obj.put("status", "Se ha insertado correctamente la ciudad.");
					obj.put("idCity", cities.get(i).getIdCity());
					obj.put("name", cities.get(i).getName());
					obj.put("idPais", cities.get(i).getIdCountry());
					break;
				}
			}
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente la ciudad.");
			return obj;
		}
	}

	public static Object deleteCity(String idCity) {
		// TODO Auto-generated method stub
		return null;
	}

	public static Object updateCity(City city, long parseLong) {
		// TODO Auto-generated method stub
		return null;
	}

}
