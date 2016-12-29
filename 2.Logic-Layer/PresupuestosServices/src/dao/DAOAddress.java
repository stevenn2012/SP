package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Address;

public class DAOAddress {

	public static List<Address> getAddress(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).open()){
			String query="select * from address";
			List<Address> address = connection.createQuery(query)
			        		 .executeAndFetch(Address.class);
			return address;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Address getAddressById(long idAddress) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).open()){
			String query="select * from address where idAddress = :id";
			List<Address> address = connection.createQuery(query)
					.addParameter("id", idAddress)
			        .executeAndFetch(Address.class);
			return address.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The address was not found");
			}else{
				System.out.println(" -> Error DAOAddress getAddressById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertAddress(Address address) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="insert into address(address, idProvider, idCity, idClient) values(:address, :idP, :idcy, :idct)";
			connection.createQuery(query)
					.addParameter("address",address.getAddress())
					.addParameter("idP", address.getIdProvider())
					.addParameter("idcy", address.getIdCity())
					.addParameter("idct", address.getIdClient())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Address");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteAddress(long idAddress) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="delete from address where address.idAddress = :id";
			connection.createQuery(query)
					.addParameter("id", idAddress)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete address");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateAddress(Address address) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionMysql.getDataBase(),ConectionMysql.getDataBaseUser(),ConectionMysql.getDataBasePass()).beginTransaction()){
			String query="update address set address = :address, idProvider = :idp, idCity = :idcy, idClient = :idc where address.idAddress = :id";
			connection.createQuery(query)
					.addParameter("id",  address.getIdAddress())
					.addParameter("address",address.getAddress())
					.addParameter("idP", address.getIdProvider())
					.addParameter("idcy", address.getIdCity())
					.addParameter("idct", address.getIdClient())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update address dao");
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
