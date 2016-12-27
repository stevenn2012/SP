package Logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import DAO.DAOArea;
import VO.Area;

public class AreaLogic {

	public static JSONObject getAreasJSON() {
		List<Area> areas = DAOArea.getAreas();
		JSONObject obj = new JSONObject();
		if (areas != null) {
			obj.putOnce("areas", areas);
			obj.put("list", "true");
			return obj;
		}else{
			obj.put("list", "false");
			obj.put("status", "Error en listar Areas");
			return obj;
		}
	}

	public static JSONObject createArea(Area area) {
		JSONObject obj = new JSONObject();
		if (DAOArea.insertArea(area.getName())) {
			List<Area> areas = new ArrayList<Area>();
			obj.put("insert", "true");
			for (int i = 0; i < areas.size(); i++) {
				if (areas.get(i).getName().equals(area.getName())) {
					obj.put("status", "Se ha insertado correctamente el area.");
					obj.put("idArea", areas.get(i).getIdArea());
					obj.put("Nombre", areas.get(i).getName());
				}
			}
			return obj;
		}else{
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el area.");
			return obj;
		}
	}

}
