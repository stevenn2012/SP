package vo;

public class Client {
	
	private long idClient;
	private String NIT;
	private String name;
	private String description;
	
	public Client(long idClient, String nIT, String name, String description) {
		this.idClient = idClient;
		NIT = nIT;
		this.name = name;
		this.description = description;
	}

	public long getIdClient() {
		return idClient;
	}

	public void setIdClient(long idClient) {
		this.idClient = idClient;
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

	@Override
	public String toString() {
		return "Client [idClient=" + idClient + ", NIT=" + NIT + ", name=" + name + ", description=" + description
				+ "]";
	}
}
