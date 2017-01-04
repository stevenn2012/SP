package logic;







public class App {

	public static void main(String[] args) throws InterruptedException {
	//System.out.println(MD5Encryption.getMD5("1234"));
	//System.out.println(LogicCity.createCity(new City(0, "Bogota", 1)));
	Long startTime = System.currentTimeMillis();
	Thread.sleep(15000);
	Long stopTime1 = System.currentTimeMillis();
	System.out.println(stopTime1-startTime);
	//System.out.println(LogicProvider.getProvidersJSON());
		//System.out.println(LogicCountry.getCountriesJSON());
		//System.out.println(LogicCountry.createCountry(new Country(0, "+075", "Peru")));
		//System.out.println(LogicProvider.getProvidersJSON());
		//System.out.println(LogicProvider.updateProvider(new Provider(1, "10000003", "Super Papas", "descripcion papas ricas")));
	}
}
