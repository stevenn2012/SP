package logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dao.DAOArea;
import dao.DAOProject;
import dao.DAORoll;
import dao.DAOUser;
import dao.DAOUserRoll;
import vo.Project;
import vo.User;
import vo.UserRoll;
import vo.vista.UserListJSON;

public class LogicUsers {

	public static JSONObject getUsersJSON() {
		List<User> usuarios = DAOUser.getUsers();
		JSONObject obj = new JSONObject();
		List<UserListJSON> listaUsuarios = new ArrayList<>();
		UserListJSON usuario = new UserListJSON();
		
		if (usuarios == null) {
			obj.put("list", "false");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("list", "true");
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
				if (usuarios.get(i).isActive()) {
					listaUsuarios.add(usuario);
				}
			}
			obj.putOnce("users", listaUsuarios);
			return obj;
		}
	}

	public static JSONObject insertUser(User usuario, long rol) {
		JSONObject obj = new JSONObject();
		List<User> usuarios = DAOUser.getUsers();
		if (usuarios==null) {
			obj.put("validate", "true");
			obj.put("create", "false");
			obj.put("status", "Error conexion base de datos");
			return obj;
		}
		
		if (usuario.getPassword()==null || usuario.getPassword().equals("d41d8cd98f00b204e9800998ecf8427e")) {
			obj.put("validate", "true");
			obj.put("create", "false");
			obj.put("status", "Password Invalido");
			return obj;
		}
		
		for (int i = 0; i < usuarios.size(); i++) {
			if (usuario.getUserName().toLowerCase().equals(usuarios.get(i).getUserName().toLowerCase()) || usuario.getDocument().toLowerCase().equals(usuarios.get(i).getDocument().toLowerCase())) {
				obj.put("validate", "true");
				obj.put("create", "false");
				obj.put("status", "Nombre de Usuario o documento Invalido");
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

	public static JSONObject deleteUser(String idUser) {
		JSONObject obj = new JSONObject();
		List<Project> proyectos = DAOProject.getProjects();
		if (proyectos!=null) {
			for (int i = 0; i < proyectos.size(); i++) {
				if (proyectos.get(i).getUser_idUser()==Long.parseLong(idUser)) {
					obj.put("validate", "true");
					obj.put("delete", "false");
					obj.put("status", "El usuario tiene asociado proyectos. No se puede borrar.");
					return obj;
				}
			}
		}
		if (DAOUserRoll.deleteUserRoll(Long.parseLong(idUser))) {
			if (DAOUser.deleteUser(Long.parseLong(idUser))) {
				obj.put("validate", "true");
				obj.put("delete", "true");
				obj.put("status", "Usuario Borrado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("delete", "false");
				obj.put("status", "Error en el borrado del roll del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("delete", "false");
			obj.put("status", "Error en el borrado del usuario");
		}
		return obj;
	}

	public static Object updateUser(User usuario, long roll) {
		JSONObject obj = new JSONObject();
		List<User> usuarios = DAOUser.getUsers();
				
		for (int i = 0; i < usuarios.size(); i++) {
			if (usuarios.get(i).getIdUser()!=usuario.getIdUser()) {
				if (usuario.getUserName().toLowerCase().equals(usuarios.get(i).getUserName().toLowerCase()) || usuario.getDocument().toLowerCase().equals(usuarios.get(i).getDocument())) {
					obj.put("validate", "true");
					obj.put("update", "false");
					obj.put("status", "Nombre de Usuario o documento Invalido");
					return obj;
				}
			}
		}
		
		if (usuario.getPassword()==null || usuario.getPassword().equals("d41d8cd98f00b204e9800998ecf8427e")) {
			for (int i = 0; i < usuarios.size(); i++) {
				if (usuarios.get(i).getIdUser()==usuario.getIdUser()) {
					usuario.setPassword(usuarios.get(i).getPassword());
				}
			}
		}
		
		if (DAOUserRoll.updateUserRoll(new UserRoll(0, usuario.getIdUser(), roll))) {
			if (DAOUser.updateUser(usuario)) {
				obj.put("validate", "true");
				obj.put("update", "true");
				obj.put("status", "Usuario Actualizado correctamente");
			}else{
				obj.put("validate", "true");
				obj.put("update", "false");
				obj.put("status", "Error en la actualizacion del roll del usuario");
			}
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "Error en la actualizacion del usuario");
		}
		return obj;
		
	}
}
