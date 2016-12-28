package vo;

import java.math.BigInteger;

public class UserRoll {
	
	BigInteger idUser_Role;
	BigInteger idUser;
	BigInteger idRole;
	
	public UserRoll(BigInteger id, BigInteger idUser, BigInteger idRole) {
		super();
		this.idUser_Role = id;
		this.idUser = idUser;
		this.idRole = idRole;
	}
	
	public BigInteger getId() {
		return idUser_Role;
	}
	
	public void setId(BigInteger id) {
		this.idUser_Role = id;
	}
	
	public BigInteger getIdUser() {
		return idUser;
	}
	
	public void setIdUser(BigInteger idUser) {
		this.idUser = idUser;
	}
	
	public BigInteger getIdRole() {
		return idRole;
	}
	
	public void setIdRole(BigInteger idRole) {
		this.idRole = idRole;
	}
	
	@Override
	public String toString() {
		return "UserRoll [id=" + idUser_Role + ", idUser=" + idUser + ", idRole=" + idRole + "]";
	}
}
