package vo.vista;

public class AddressListJSON {
	private long   idAddress;	
	private String direccion;
	private String ciudad;
	private String pais;
	
	public AddressListJSON(long idAddress, String direccion, String ciudad, String pais) {
		super();
		this.idAddress = idAddress;
		this.direccion = direccion;
		this.ciudad = ciudad;
		this.pais = pais;
	}
	public long getIdAddress() {
		return idAddress;
	}
	public void setIdAddress(long idAddress) {
		this.idAddress = idAddress;
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
