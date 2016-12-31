package logic;

import dao.DAOAddress;
import dao.DAOCity;
import dao.DAOCountry;
import vo.Country;

public class App {

	public static void main(String[] args) {
	//System.out.println(MD5Encryption.getMD5("1234"));
	//System.out.println(LogicProvider.getProvidersJSON());
		//System.out.println(LogicCountry.getCountriesJSON());
		//System.out.println(LogicCountry.createCountry(new Country(0, "+075", "Peru")));
		System.out.println(DAOAddress.getAddress());
		System.out.println(DAOCity.getCities());
		System.out.println(DAOCountry.getCountry());	
		System.out.println(LogicCountry.deleteCountry("2"));
	}
}
