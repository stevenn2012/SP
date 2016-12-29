package vo.vista;

import java.util.ArrayList;
import java.util.List;

import vo.Address;
import vo.Contact;
import vo.ProductService;

public class ProviderListJSON {

	private long idProvider;
	private String NIT;
	private String name;
	private String description;
	private List<ProductService> productServices;
	private List<Contact> contacts;
	private List<AddressListJSON> address;
		
	public ProviderListJSON(long idProvider, String nIT, String name, String description) {
		this.idProvider  = idProvider;
		NIT			     = nIT;
		this.name 		 = name;
		this.description = description;
		productServices  = new ArrayList<>();
		contacts 		 = new ArrayList<>();
		address			 = new ArrayList<>();
	}
	public long getIdProvider() {
		return this.idProvider;
	}
	public void setIdProvider(long idProvider) {
		this.idProvider = idProvider;
	}
	public String getNIT() {
		return NIT;
	}
	public void setNIT(String nIT) {
		NIT = nIT;
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
	public List<ProductService> getProductServices() {
		return productServices;
	}
	public void addProductService(ProductService productServices) {
		this.productServices.add(productServices);
	}
	public List<Contact> getContacts() {
		return contacts;
	}
	public void addContact(Contact contacts) {
		this.contacts.add(contacts);
	}
	public List<AddressListJSON> getAddress() {
		return address;
	}
	public void addAddress(AddressListJSON address) {
		this.address.add(address);
	}
	@Override
	public String toString() {
		return "ProviderListJSON [idProvider=" + idProvider + ", NIT=" + NIT + ", name=" + name + ", description="
				+ description + ", productServices=" + productServices + ", contacts=" + contacts + ", address="
				+ address + "]";
	}
	
		
}
