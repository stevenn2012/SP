package DAO;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import VO.User;
import VO.UserRoll;

public class DAOUserRoll {
	
	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
	
	public static List<UserRoll> getUserRoll(){
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).open()){
			String query="select * from user_role";
			List<UserRoll> usersrolls = connection.createQuery(query)
			        		 .executeAndFetch(UserRoll.class);
			return usersrolls;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}

}
