package Logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import DAO.DAOArea;
import DAO.DAORoll;
import DAO.DAOUser;
import DAO.DAOUserRoll;
import VO.User;
import VO.vistas.UserListJSON;

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
			usuario.setEmail(usuarios.get(i).getEmail());
			listaUsuarios.add(usuario);
		}
		obj.putOnce("users", listaUsuarios);
		return obj;
	}

	public static JSONObject insertUser(User usuario, int rol) {
		JSONObject obj = new JSONObject();
		if (DAOUser.insertUser(usuario)) {
			if (DAOUserRoll.insert(DAOUser.getUserByUsernameAndPassword(usuario.getUserName(), usuario.getPassword()).getIdUser(),rol)) {
				obj.put("create", "true");
			}else{
				obj.put("create", "false");
			}
		}else{
			obj.put("create", "false");
		}
		return obj;
	}
}
