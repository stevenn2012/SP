package vo;

import java.math.BigInteger;

public class User {

	private BigInteger idUser;
	private BigInteger document;
	private String name;
	private String userName;
	private String password;
	private BigInteger idArea;
	private String email;
	
	public User(BigInteger idUser, BigInteger document, String name, String userName, String password, BigInteger idArea , String email) {
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

	public BigInteger getIdUser() {
		return idUser;
	}

	public void setIdUser(BigInteger idUser) {
		this.idUser = idUser;
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

	public BigInteger getIdArea() {
		return idArea;
	}

	public void setIdArea(BigInteger idArea) {
		this.idArea = idArea;
	}

	@Override
	public String toString() {
		return "User [idUser=" + idUser + ", document=" + document + ", name=" + name + ", userName=" + userName
				+ ", password=" + password + ", idArea=" + idArea + ", email=" + email + "]";
	}
	
}
