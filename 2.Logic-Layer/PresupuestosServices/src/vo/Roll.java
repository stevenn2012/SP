package vo;

import java.math.BigInteger;

public class Roll {
	private BigInteger idRole;
	private String name;
	private String description;
	
	public Roll(BigInteger idRol, String name, String description) {
		this.idRole = idRol;
		this.name = name;
		this.description = description;
	}
	
	public BigInteger getIdRol() {
		return idRole;
	}
	
	public void setIdRol(BigInteger idRol) {
		this.idRole = idRol;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Override
	public String toString() {
		return "Rol [idRol=" + idRole + ", name=" + name + ", description=" + description + "]";
	}
}
