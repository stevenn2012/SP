package santa.publicidad.VO;

public class UserRoll {
	
	int idUser_Role;
	int idUser;
	int idRole;
	public int getId() {
		return idUser_Role;
	}
	public void setId(int id) {
		this.idUser_Role = id;
	}
	public int getIdUser() {
		return idUser;
	}
	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}
	public int getIdRole() {
		return idRole;
	}
	public void setIdRole(int idRole) {
		this.idRole = idRole;
	}
	public UserRoll(int id, int idUser, int idRole) {
		super();
		this.idUser_Role = id;
		this.idUser = idUser;
		this.idRole = idRole;
	}
	@Override
	public String toString() {
		return "UserRoll [id=" + idUser_Role + ", idUser=" + idUser + ", idRole=" + idRole + "]";
	}
	
	

}
