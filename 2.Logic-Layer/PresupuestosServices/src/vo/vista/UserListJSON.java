package vo.vista;

import java.math.BigInteger;

public class UserListJSON {
	private BigInteger iduser;
	private BigInteger document;
	private String name;
	private String username;
	private String roll;
	private String area;
	private String email;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public BigInteger getIduser() {
		return iduser;
	}
	public void setIduser(BigInteger iduser) {
		this.iduser = iduser;
	}
	public BigInteger getDocument() {
		return document;
	}
	public void setDocument(BigInteger document) {
		this.document = document;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getRoll() {
		return roll;
	}
	public void setRoll(String roll) {
		this.roll = roll;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	
	public UserListJSON() {}
	
	
	
}
