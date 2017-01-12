package logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOBudget;
import dao.DAOClient;
import dao.DAOContact;
import dao.DAOProject;
import vo.Address;
import vo.Budget;
import vo.Client;
import vo.Contact;
import vo.Project;
import vo.vista.ClientListJSON;

public class LogicClient {

	public static JSONObject getClientsJSON() {
		JSONObject			 obj	      = new JSONObject();
		List<Client>		 clientes     = DAOClient.getClient();
		List<Address>		 direcciones  = DAOAddress.getAddress();
		List<Contact> 		 contactos    = DAOContact.getContact();
		List<Project> 		 proyectos    = DAOProject.getProjects();
		List<Budget>         presupuestos = DAOBudget.getBudget();
		List<ClientListJSON> clienteVista = new ArrayList<>();
		
		if (clientes!=null && direcciones !=null && contactos!=null && proyectos!=null && presupuestos!=null) {
			for (int i = 0; i < clientes.size(); i++) {
				
			}
			return null;
		}else{
			obj.put("list", "false");
			obj.put("validate", "true");
			obj.put("status", "error al listar los proveedores. Error en base de datos");
			return obj;
		}
			
	}

	public static JSONObject insertClient(Client client) {
		// TODO Auto-generated method stub
		return null;
	}

	public static JSONObject updateClient(Client client) {
		// TODO Auto-generated method stub
		return null;
	}

	public static JSONObject deleteClient(String idClient) {
		// TODO Auto-generated method stub
		return null;
	}

}
