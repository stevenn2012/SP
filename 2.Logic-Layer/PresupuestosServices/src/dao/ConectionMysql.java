package dao;

public class ConectionMysql {

	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
	
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
