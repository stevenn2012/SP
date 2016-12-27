package Logic;

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
			obj.put("accionListar", "true");
			return obj;
		}else{
			obj.put("accionListar", "false");
			return obj;
		}
	}

}
