package vo;

public class Country {

	private long idCountry;
	private String countryCode;
	private String name;
	
	public Country(long idCountry, String countryCode, String name) {
		this.idCountry = idCountry;
		this.countryCode = countryCode;
		this.name = name;
	}

	public long getIdCountry() {
		return idCountry;
	}

	public void setIdCountry(long idCountry) {
		this.idCountry = idCountry;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Country [idCountry=" + idCountry + ", countryCode=" + countryCode + ", name=" + name + "]";
	}
		
}
