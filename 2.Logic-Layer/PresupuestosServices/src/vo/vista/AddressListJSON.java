package vo.vista;

public class AddressListJSON {

	private String direccion;
	private String ciudad;
	private String pais;
	public AddressListJSON(String direccion, String ciudad, String pais) {
		super();
		this.direccion = direccion;
		this.ciudad = ciudad;
		this.pais = pais;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getCiudad() {
		return ciudad;
	}
	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	@Override
	public String toString() {
		return "AddressListJSON [direccion=" + direccion + ", ciudad=" + ciudad + ", pais=" + pais + "]";
	}
}
