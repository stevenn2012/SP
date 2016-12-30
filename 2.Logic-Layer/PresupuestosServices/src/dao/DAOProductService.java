package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.ProductService;

public class DAOProductService {

	public static List<ProductService> getProductService(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from productservice";
			List<ProductService> productservice = connection.createQuery(query)
			        		 .executeAndFetch(ProductService.class);
			return productservice;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static ProductService getProductServiceById(long idProductService) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from productservice where idProductService = :id";
			List<ProductService> productservice = connection.createQuery(query)
					.addParameter("id", idProductService)
			        .executeAndFetch(ProductService.class);
			return productservice.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The productservice was not found");
			}else{
				System.out.println(" -> Error DAOProductService getProductServiceById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertProductService(ProductService productservice) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="insert into productservice(name, description, price, idProvider) values(:name, :desc, :price, :idprovider)";
			connection.createQuery(query)
					.addParameter("name",productservice.getName())
					.addParameter("desc", productservice.getDescription())
					.addParameter("price", productservice.getPrice())
					.addParameter("idprovider", productservice.getIdProvider())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar ProductService");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteProductService(long idProductService) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="delete from productservice where productservice.idProductService = :id";
			connection.createQuery(query)
					.addParameter("id", idProductService)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete productservice");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateProductService(ProductService productservice) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="update productservice set name = :name, description = :desc, price = :price, idProvider = :idprovider where productservice.idProductService = :id";
			connection.createQuery(query)
					.addParameter("id",productservice.getIdProductService())
					.addParameter("name",productservice.getName())
					.addParameter("desc", productservice.getDescription())
					.addParameter("price", productservice.getPrice())
					.addParameter("idprovider", productservice.getIdProvider())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update productservice");
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
