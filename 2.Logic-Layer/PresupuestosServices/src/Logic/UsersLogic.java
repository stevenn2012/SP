package Logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import DAO.DAOArea;
import DAO.DAORoll;
import DAO.DAOUser;
import VO.User;
import VO.UserListJSON;

public class UsersLogic {

	public static JSONObject getUsersJSON() {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		List<UserListJSON> listaUsuarios = new ArrayList<>();
		UserListJSON usuario = new UserListJSON();
		obj.put("validate", "true");
		for (int i = 0; i < usuarios.size(); i++) {
			usuario = new UserListJSON();
			usuario.setIduser(usuarios.get(i).getIdUser());
			usuario.setDocument(usuarios.get(i).getDocument());
			usuario.setName(usuarios.get(i).getName());
			usuario.setUsername(usuarios.get(i).getUserName());
			String roll1 = DAORoll.getRoleByIdUser(usuarios.get(i).getIdUser()).getName();
			usuario.setRoll(roll1);
			String area1 = DAOArea.getAreaByIdArea(usuarios.get(i).getIdArea()).getName();
			usuario.setArea(area1);
			listaUsuarios.add(usuario);
		}
		obj.putOnce("users", listaUsuarios);
		return obj;
	}

}
