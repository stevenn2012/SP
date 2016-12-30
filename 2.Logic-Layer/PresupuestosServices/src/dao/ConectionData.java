package dao;

public class ConectionData {

	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
	private static String[] urlAccess = {"http://localhost","null"};
	
	
	public static String[] getUrlAccess() {
		return urlAccess;
	}
	public static String getDataBase() {
		return dataBase;
	}
	public static String getDataBaseUser() {
		return dataBaseUser;
	}
	public static String getDataBasePass() {
		return dataBasePass;
	}
	
	
}
