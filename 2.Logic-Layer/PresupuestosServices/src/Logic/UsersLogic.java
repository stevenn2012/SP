package Logic;

import java.util.List;

import org.json.JSONObject;

import DAO.DAOArea;
import DAO.DAORoll;
import DAO.DAOUser;
import VO.User;

public class UsersLogic {

	public static JSONObject getUsersJSON() {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		obj.put("validate", "true");
		for (int i = 0; i < usuarios.size(); i++) {
			obj.put("iduser"+i, usuarios.get(i).getIdUser());
			obj.put("document"+i, usuarios.get(i).getDocument());
			obj.put("name"+i, usuarios.get(i).getName());
			obj.put("username"+i, usuarios.get(i).getUserName());
			String roll1 = DAORoll.getRoleByIdUser(usuarios.get(i).getIdUser()).getName();
			obj.put("roll"+i, roll1);
			String area1 = DAOArea.getAreaByIdArea(usuarios.get(i).getIdArea()).getName();
			obj.put("area"+i, area1);
		}
		
		return obj;
	}

}
