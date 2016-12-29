package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.UserRoll;

public class DAOUserRoll {
	
	public static List<UserRoll> getUserRoll(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).open()){
			String query="select * from user_role";
			List<UserRoll> usersrolls = connection.createQuery(query)
			        		 .executeAndFetch(UserRoll.class);
			return usersrolls;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static boolean insert(long idUser, long rol) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="insert into user_role(idUser, idRole) values(:idUser, :idRol)";
			connection.createQuery(query)
					.addParameter("idUser",idUser)
					.addParameter("idRol", rol)
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
	
	public static boolean deleteUserRoll(long idUsuario) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="delete from user_role where user_role.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idUser", idUsuario)
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
	
	public static boolean updateUserRoll(UserRoll userrol) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="update user_role set idRole = :idRol where user_role.idUser = :idUser";
			connection.createQuery(query)
					.addParameter("idRol", userrol.getIdRole())
					.addParameter("idUser", userrol.getIdUser())
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
