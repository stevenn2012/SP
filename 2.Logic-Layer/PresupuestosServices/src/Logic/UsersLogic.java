package Logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import DAO.DAOArea;
import DAO.DAORoll;
import DAO.DAOUser;
import DAO.DAOUserRoll;
import VO.User;
import VO.UserRoll;
import VO.vistas.UserListJSON;

public class UsersLogic {

	public static JSONObject getUsersJSON() {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		List<UserListJSON> listaUsuarios = new ArrayList<>();
		UserListJSON usuario = new UserListJSON();
		obj.put("list", "true");
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
		List<User> usuarios = DAOUser.getUsers();
		for (int i = 0; i < usuarios.size(); i++) {
			if (usuario.getUserName().toLowerCase().equals(usuarios.get(i).getUserName().toLowerCase()) || usuario.getDocument()==usuarios.get(i).getDocument()) {
				obj.put("validate", "true");
				obj.put("create", "false");
				obj.put("status", "invalid Document or Username");
				return obj;
			} 
		}
		if (DAOUser.insertUser(usuario)) {
			if (DAOUserRoll.insert(DAOUser.getUserByUsernameAndPassword(usuario.getUserName(), usuario.getPassword()).getIdUser(),rol)) {
				obj.put("validate", "true");
				obj.put("create", "true");
				obj.put("status", "Usuario Insertado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("create", "false");
				obj.put("status", "Error en insertar el user_rol del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("create", "false");
			obj.put("status", "Error en insertar los datos del usuario");
		}
		return obj;
	}

	public static Object deleteUser(String idUser) {
		JSONObject obj = new JSONObject();
		if (DAOUserRoll.deleteUserRoll(Integer.parseInt(idUser))) {
			if (DAOUser.deleteUser(Integer.parseInt(idUser))) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Usuario Borrado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error en el borrado del user_roll del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "Error en el borrado del usuario");
		}
		return obj;
	}

	public static Object updateUser(User usuario, int roll) {
		JSONObject obj = new JSONObject();
		if (DAOUserRoll.updateUserRoll(new UserRoll(0, usuario.getIdUser(), roll))) {
			if (DAOUser.updateUser(usuario)) {
				obj.put("validate", "true");
				obj.put("update", "true");
				obj.put("status", "Usuario Actualizado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("update", "false");
				obj.put("status", "Error en la actualizacion del user_roll del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error en la actualizacion del usuario");
		}
		return obj;
		
	}
}
