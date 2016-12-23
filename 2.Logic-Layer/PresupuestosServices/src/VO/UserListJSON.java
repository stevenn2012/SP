package VO;

public class UserListJSON {
	private int iduser;
	private int document;
	private String name;
	private String username;
	private String roll;
	private String area;
	public int getIduser() {
		return iduser;
	}
	public void setIduser(int iduser) {
		this.iduser = iduser;
	}
	public int getDocument() {
		return document;
	}
	public void setDocument(int document) {
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
	@Override
	public String toString() {
		return "ListaUsuarios [iduser=" + iduser + ", document=" + document + ", name=" + name + ", username="
				+ username + ", roll=" + roll + ", area=" + area + "]";
	}
	public UserListJSON(int iduser, int document, String name, String username, String roll, String area) {
		super();
		this.iduser = iduser;
		this.document = document;
		this.name = name;
		this.username = username;
		this.roll = roll;
		this.area = area;
	}
	public UserListJSON() {}
	
	
	
}
