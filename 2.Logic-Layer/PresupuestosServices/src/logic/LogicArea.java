package logic;

import java.util.List;
import org.json.JSONObject;

import dao.DAOArea;
import vo.Area;


public class LogicArea {

	public static JSONObject getAreasJSON() {
		List<Area> areas = DAOArea.getAreas();
		JSONObject obj = new JSONObject();
		if (areas != null) {
			obj.putOnce("areas", areas);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar Areas");
			return obj;
		}
	}

	public static JSONObject createArea(Area area) {
		JSONObject obj = new JSONObject();
		List<Area> areas = DAOArea.getAreas();
		for (int i = 0; i < areas.size(); i++) {
			if(areas.get(i).getName().toLowerCase().equals(area.getName().toLowerCase())){
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "El área se encontraba previamente en la base de datos.");
				obj.put("idArea", areas.get(i).getIdArea());
				obj.put("Nombre", areas.get(i).getName());
				return obj;
			}
		}
		if (DAOArea.insertArea(area.getName())) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			areas = DAOArea.getAreas();
			for (int i = 0; i < areas.size(); i++) {
				if (areas.get(i).getName().equals(area.getName())) {
					obj.put("status", "Se ha insertado correctamente el area.");
					obj.put("idArea", areas.get(i).getIdArea());
					obj.put("Nombre", areas.get(i).getName());
					break;
				}
			}
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el area.");
			return obj;
		}
	}

}
