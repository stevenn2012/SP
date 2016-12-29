package dao;

import java.util.List;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.User;

public class DAOUser {
	
	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
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
			String query="select * from user where userName = :username and password = :password";
			List<User> users = connection.createQuery(query)
					.addParameter("username", username)
					.addParameter("password", password)
			        .executeAndFetch(User.class);
			return users.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOUser getuserbynameandpass");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertUser(User usuario) {
		initDriver();
		
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).beginTransaction()){
			String query="insert into user(document, name, userName, password, idArea, email) values(:document, :name, :username, :password, :idArea, :email)";
			connection.createQuery(query)
					.addParameter("document",usuario.getDocument())
					.addParameter("name", usuario.getName())
					.addParameter("username", usuario.getUserName() )
					.addParameter("password", usuario.getPassword())
					.addParameter("idArea", usuario.getIdArea())
					.addParameter("email",usuario.getEmail())
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
	
	public static boolean deleteUser(long idUsuario) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).beginTransaction()){
			String query="delete from user where user.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idUser", idUsuario)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateUser(User usuario) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).beginTransaction()){
			String query="update user set document = :document, name = :name, userName = :username, password = :password, idArea = :idArea, email = :email where user.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("document",usuario.getDocument())
					.addParameter("name", usuario.getName())
					.addParameter("username", usuario.getUserName() )
					.addParameter("password", usuario.getPassword())
					.addParameter("idArea", usuario.getIdArea())
					.addParameter("email",usuario.getEmail())
					.addParameter("idUser",usuario.getIdUser())
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
	
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}
}
