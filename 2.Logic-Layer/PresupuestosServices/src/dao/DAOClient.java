package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Client;

public class DAOClient {
	
	public static List<Client> getClient(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from client where active = 1";
			List<Client> client = connection.createQuery(query)
			        		 .executeAndFetch(Client.class);
			return client;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Client getClientById(long idClient) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from client where idClient = :id";
			List<Client> client = connection.createQuery(query)
					.addParameter("id", idClient)
			        .executeAndFetch(Client.class);
			return client.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The client was not found");
			}else{
				System.out.println(" -> Error DAOClient getClientById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static Client getClientByNIT(String nit) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from client where client.NIT = :nit";
			List<Client> client = connection.createQuery(query)
					.addParameter("nit", nit)
			        .executeAndFetch(Client.class);
			return client.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The client was not found");
			}else{
				System.out.println(" -> Error DAOClient getClientByNIT");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertClient(Client client) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="insert into client(NIT, name, description, DV, active) values(:nit, :name, :desc, :dv, :active)";
			connection.createQuery(query)
					.addParameter("nit",client.getNIT())
					.addParameter("name", client.getName())
					.addParameter("desc", client.getDescription())
					.addParameter("dv", client.getDV())
					.addParameter("active", client.isActive())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Client");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteClient(long idClient) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="delete from client where client.idClient = :id";
			connection.createQuery(query)
					.addParameter("id", idClient)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete client");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateClient(Client client) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="update client set NIT = :nit, name = :name, description = :desc, DV = :DV, active = :active where client.idClient = :id";
			connection.createQuery(query)
					.addParameter("id",  client.getIdClient())
					.addParameter("nit", client.getNIT())
					.addParameter("name", client.getName())
					.addParameter("desc", client.getDescription())
					.addParameter("DV", client.getDV())
					.addParameter("active", client.isActive())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update client");
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
