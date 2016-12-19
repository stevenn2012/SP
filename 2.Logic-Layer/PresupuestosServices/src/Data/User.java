package Data;

public class User {

	private int idUser;
	private String username;
	private String password;
	private String name;
	private int Rol_idRol;
	
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRol_idRol() {
		return Rol_idRol;
	}
	public void setRol_idRol(int rol_idRol) {
		Rol_idRol = rol_idRol;
	}
	@Override
	public String toString() {
		return "User [idUser=" + idUser + ", username=" + username + ", password=" + password + ", name=" + name
				+ ", Rol_idRol=" + Rol_idRol + "]";
	}
}
