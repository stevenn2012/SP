package VO;

public class Roll {
	private int idRole;
	private String name;
	private String description;
	
	public Roll(int idRol, String name, String description) {
		this.idRole = idRol;
		this.name = name;
		this.description = description;
	}
	public int getIdRol() {
		return idRole;
	}
	public void setIdRol(int idRol) {
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
