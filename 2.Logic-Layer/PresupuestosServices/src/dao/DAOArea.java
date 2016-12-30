package dao;

import java.util.List;
import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Area;

public class DAOArea {
	
	
	
	public static List<Area> getAreas(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from area";
			List<Area> areas = connection.createQuery(query)
			        		 .executeAndFetch(Area.class);
			return areas;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Area getAreaByIdArea(long areaId) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from area where idArea = :idArea";
			List<Area> area = connection.createQuery(query)
					.addParameter("idArea", areaId)
			        .executeAndFetch(Area.class);
			return area.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The area was not found");
			}else{
				System.out.println(" -> Error");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertArea(String name) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="insert into Area(name) values(:name)";
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
	
	public static void initDriver(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println();
		} catch (ClassNotFoundException e) {
			System.out.println(e);
		}
	}

}
