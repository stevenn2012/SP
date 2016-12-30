package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Provider;

public class DAOProvider {

	public static List<Provider> getProvider(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from provider";
			List<Provider> provider = connection.createQuery(query)
			        		 .executeAndFetch(Provider.class);
			return provider;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Provider getProviderById(long idProvider) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from provider where idProvider = :id";
			List<Provider> provider = connection.createQuery(query)
					.addParameter("id", idProvider)
			        .executeAndFetch(Provider.class);
			return provider.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The provider was not found");
			}else{
				System.out.println(" -> Error DAOProvider getProviderById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertProvider(Provider provider) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="insert into provider(NIT, name, description) values(:nit, :name, :desc)";
			connection.createQuery(query)
					.addParameter("nit",provider.getNIT())
					.addParameter("name", provider.getName())
					.addParameter("desc", provider.getDescription())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Provider");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteProvider(long idProvider) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="delete from provider where provider.idProvider = :id";
			connection.createQuery(query)
					.addParameter("id", idProvider)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete provider");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateProvider(Provider provider) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="update provider set NIT = :nit, name = :name, description = :desc where provider.idProvider = :id";
			connection.createQuery(query)
					.addParameter("id",  provider.getIdProvider())
					.addParameter("nit", provider.getNIT())
					.addParameter("name", provider.getName())
					.addParameter("desc", provider.getDescription())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update provider");
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
