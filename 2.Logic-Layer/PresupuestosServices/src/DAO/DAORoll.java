package DAO;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import VO.Area;
import VO.Roll;

public class DAORoll {
	
	private static String dataBase = "jdbc:mysql://localhost:3306/SPDB";
	private static String dataBaseUser = "root";
	private static String dataBasePass = "";
	
	public static List<Roll> getRoll(){
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).open()){
			String query="select * from role";
			List<Roll> role = connection.createQuery(query)
			        		 .executeAndFetch(Roll.class);
			return role;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Roll getRoleByIdRole(int roleId) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).open()){
			String query="select idRole from role where idRole = :idrole";
			List<Area> area = connection.createQuery(query)
					.addParameter("idrole", areaId)
			        .executeAndFetch(Area.class);
			return area.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The area was not founds");
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

	public static boolean insertArea(String name) {
		initDriver();
		try (Connection connection = new Sql2o(dataBase,dataBaseUser,dataBasePass).beginTransaction()){
			String query="insert into user(name) values(:name)";
			connection.createQuery(query)
					.addParameter("name", name)
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
