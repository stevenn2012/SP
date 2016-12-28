package vo;

public class User {

	private long idUser;
	private long document;
	private String name;
	private String userName;
	private String password;
	private long idArea;
	private String email;
	
	public User(long idUser, long document, String name, String userName, String password, long idArea , String email) {
		super();
		this.idUser = idUser;
		this.document = document;
		this.name = name;
		this.userName = userName;
		this.password = password;
		this.idArea = idArea;
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
		this.idUser = idUser;
	}

	public long getDocument() {
		return document;
	}

	public void setDocument(long document) {
		this.document = document;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getIdArea() {
		return idArea;
	}

	public void setIdArea(long idArea) {
		this.idArea = idArea;
	}

	@Override
	public String toString() {
		return "User [idUser=" + idUser + ", document=" + document + ", name=" + name + ", userName=" + userName
				+ ", password=" + password + ", idArea=" + idArea + ", email=" + email + "]";
	}
	
}
