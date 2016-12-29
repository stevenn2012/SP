package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Country;
import vo.User;

public class DAOCountry {

	public static List<Country> getUsers(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).open()){
			String query="select * from country";
			List<Country> paises = connection.createQuery(query)
			        		 .executeAndFetch(Country.class);
			return paises;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Country getCountryByName(String cname) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).open()){
			String query="select * from country where name = :cname";
			List<Country> country = connection.createQuery(query)
					.addParameter("username", cname)
			        .executeAndFetch(Country.class);
			return country.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The user was not found");
			}else{
				System.out.println(" -> Error DAOCountry getCountryByname");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertCountry(Country country) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="insert into country(countryCode, name) values(:cc, :name)";
			connection.createQuery(query)
					.addParameter("cc",country.getCountryCode())
					.addParameter("name", country.getName())
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
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
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
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
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
