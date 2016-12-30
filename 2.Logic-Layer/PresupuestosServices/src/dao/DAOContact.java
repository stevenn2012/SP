package dao;

import java.util.List;

import org.sql2o.Connection;
import org.sql2o.Sql2o;

import vo.Contact;

public class DAOContact {

	public static List<Contact> getContact(){
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from contact";
			List<Contact> contact = connection.createQuery(query)
			        		 .executeAndFetch(Contact.class);
			return contact;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Contact getContactById(long idContact) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).open()){
			String query="select * from contact where idContact = :id";
			List<Contact> contact = connection.createQuery(query)
					.addParameter("id", idContact)
			        .executeAndFetch(Contact.class);
			return contact.get(0);
		} catch (Exception e) {
			if((e+"").equalsIgnoreCase("java.lang.IndexOutOfBoundsException: Index: 0, Size: 0")){
				System.out.println(" -> The contact was not found");
			}else{
				System.out.println(" -> Error DAOContact getContactById");
				System.out.println(e);
			}
			return null;
		}
	}
	
	public static boolean insertContact(Contact contact) {
		initDriver();
		
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="insert into contact(name,email,phoneNumber,idProvider,idClient) values(:name, :email, :phonenumber, :idprovider, :idclient)";
			connection.createQuery(query)
					.addParameter("name",contact.getName())
					.addParameter("email", contact.getEmail())
					.addParameter("phonenumber", contact.getPhoneNumber())
					.addParameter("idprovider", contact.getIdProvider())
					.addParameter("idclient", contact.getIdClient())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error insertar Contact");
			System.out.println(e);
			return false;
		}
	}
	
	public static boolean deleteContact(long idContact) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="delete from contact where contact.idContact = :id";
			connection.createQuery(query)
					.addParameter("id", idContact)
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error delete contact");
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static boolean updateContact(Contact contact) {
		initDriver();
		try (Connection connection = new Sql2o(ConectionData.getDataBase(),ConectionData.getDataBaseUser(),ConectionData.getDataBasePass()).beginTransaction()){
			String query="update contact set name = :name, email = :email, phoneNumber = :phonenumber, idProvider = :idprovider, idClient = :idclient where contact.idContact = :id";
			connection.createQuery(query)
					.addParameter("id",  contact.getIdContact())
					.addParameter("name",contact.getName())
					.addParameter("email", contact.getEmail())
					.addParameter("phonenumber", contact.getPhoneNumber())
					.addParameter("idprovider", contact.getIdProvider())
					.addParameter("idclient", contact.getIdClient())
					.executeUpdate();
			connection.commit();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(" -> Error update contact");
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
