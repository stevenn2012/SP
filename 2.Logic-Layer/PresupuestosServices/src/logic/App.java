package logic;

import dao.DAOAddress;
import dao.DAOCity;
import dao.DAOCountry;
import dao.DAOProvider;
import vo.Country;
import vo.Provider;

public class App {

	public static void main(String[] args) {
	//System.out.println(MD5Encryption.getMD5("1234"));
	//System.out.println(LogicProvider.getProvidersJSON());
		//System.out.println(LogicCountry.getCountriesJSON());
		//System.out.println(LogicCountry.createCountry(new Country(0, "+075", "Peru")));
		System.out.println(LogicProvider.getProvidersJSON());
		System.out.println(LogicProvider.updateProvider(new Provider(1, "10000003", "Super Papas", "descripcion papas ricas")));

	}
}
