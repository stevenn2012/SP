package Data;

import java.util.List;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

public class DAOUser {
	
	private static String dataBase = "jdbc:mysql://localhost:3306/users";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
	
	public static List<User> getUsers(){
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).open()){
			String query="select * from user";
			List<User> users = connection.createQuery(query)
			        		 .executeAndFetch(User.class);
			return users;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static User getUserByUsernameAndPassword(String username, String password) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).open()){
			String query="select * from user where username = :username and password = :password";
			List<User> users = connection.createQuery(query)
					.addParameter("username", username)
					.addParameter("password", password)
			        .executeAndFetch(User.class);
			return users.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not founds");
			}else{
				System.out.println(" -> Error");
				System.out.println(e);
			}
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

	public static boolean insertUser(String name, String username, String password, int rolnumber) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).beginTransaction()){
			String query="insert into user(username, password, name, Rol_idRol) values(:username, :password, :name, :rolnumber)";
			connection.createQuery(query)
					.addParameter("username", username)
					.addParameter("password", password)
					.addParameter("name", name)
					.addParameter("rolnumber", rolnumber)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e);
			return false;
		}
	}
}
