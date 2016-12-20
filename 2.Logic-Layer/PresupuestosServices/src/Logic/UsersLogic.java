package Logic;

import java.util.List;

import org.json.JSONObject;

import DAO.DAOUser;
import VO.User;

public class UsersLogic {

	public static JSONObject getUsersJSON() {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		obj.put("validate", "true");
		for (int i = 0; i < usuarios.size(); i++) {
			obj.put("iduser", usuarios.get(i).getIdUser());
			obj.put("document", usuarios.get(i).getDocument());
			obj.put("name", usuarios.get(i).getName());
			obj.put("username", usuarios.get(i).getUserName());
		}
		return obj;
	}

}
