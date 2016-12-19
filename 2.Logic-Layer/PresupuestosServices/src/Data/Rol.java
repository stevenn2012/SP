package Data;

public class Rol {
	private int idRol;
	private String name;
	private String description;
	public int getIdRol() {
		return idRol;
	}
	public void setIdRol(int idRol) {
		this.idRol = idRol;
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
		return "Rol [idRol=" + idRol + ", name=" + name + ", description=" + description + "]";
	}
}
