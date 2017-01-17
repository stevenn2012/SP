package logic;

import java.util.List;
import org.json.JSONObject;

import dao.DAOArea;
import dao.DAOUser;
import vo.Area;
import vo.User;


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
			for(int i = 0; i < areas.size(); i++) {
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

	public static JSONObject updateArea(Area areaObj) {
		JSONObject obj = new JSONObject();
		if (DAOArea.updateArea(areaObj)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Se actualizó el área correctamente");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "No se actualizó el área correctamente");
			return obj;
		}
	}

	public static JSONObject deleteArea(long parseLong) {
		JSONObject obj = new JSONObject();
		List<User> usuarios = DAOUser.getUsers();
		if (usuarios!=null) {
			for (int i = 0; i < usuarios.size(); i++) {
				if (usuarios.get(i).getIdArea()==parseLong) {
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "No se puede borrar el Área, hay usuarios asociados.");
					return obj;
				}
			}
		}
		if (DAOArea.deleteArea(parseLong)) {
			obj.put("validate", "true");
			obj.put("delete", "true");
			obj.put("status", "Se borró el área correctamente");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "No se borró el área. Error de conexión");
			return obj;
		}
	}

}
