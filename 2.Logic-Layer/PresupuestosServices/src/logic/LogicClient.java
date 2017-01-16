package logic;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import dao.DAOBudget;
import dao.DAOCity;
import dao.DAOClient;
import dao.DAOContact;
import dao.DAOCountry;
import dao.DAOProject;
import vo.Address;
import vo.Budget;
import vo.City;
import vo.Client;
import vo.Contact;
import vo.Country;
import vo.Project;
import vo.vista.AddressListJSON;
import vo.vista.ClientListJSON;
import vo.vista.ProjectListJSON;

public class LogicClient {

	public static JSONObject getClientsJSON() {
		JSONObject			 obj	      = new JSONObject();
		List<Client>		 clientes     = DAOClient.getClient();
		List<Address>		 direcciones  = DAOAddress.getAddress();
		List<Contact> 		 contactos    = DAOContact.getContact();
		List<Project> 		 proyectos    = DAOProject.getProjects();
		List<Budget>         presupuestos = DAOBudget.getBudget();
		List<City>           ciudades     = DAOCity.getCities();
		List<Country>        paises       = DAOCountry.getCountry();
		List<ClientListJSON> clienteVista = new ArrayList<>();
		List<AddressListJSON>addressVista = new ArrayList<>();
		List<ProjectListJSON>proyectVista = new ArrayList<>();
		
		if (clientes!=null && direcciones !=null && contactos!=null && proyectos!=null && presupuestos!=null && paises!=null && ciudades!=null) {
			
			//Cargar clientes en los clientes que se envian a la vista
			for (int i = 0; i < clientes.size(); i++) {
				if (clientes.get(i).isActive()) {
					ClientListJSON c = new ClientListJSON(clientes.get(i).getIdClient(), clientes.get(i).getNIT(), clientes.get(i).getName(), clientes.get(i).getDescription(), clientes.get(i).getDV(), true);
					clienteVista.add(c);
				}
				 
			}
			//cargar las direccionones vista que van en clientesvista
			for (int i = 0; i < direcciones.size(); i++) {
				AddressListJSON dir = new AddressListJSON(direcciones.get(i).getIdAddress(),direcciones.get(i).getIdClient(), direcciones.get(i).getAddress(), "", "");
				for (int j = 0; j < ciudades.size(); j++) {
					if (direcciones.get(i).getIdCity()==ciudades.get(j).getIdCity()) {
						dir.setCiudad(ciudades.get(j).getName());
						for (int k = 0; k < paises.size(); k++) {
							if (ciudades.get(j).getIdCountry()==paises.get(k).getIdCountry()) {
								dir.setPais(paises.get(k).getName());
								break;
							}
						}
						break;
					}
				}
				addressVista.add(dir);
			}
			
			//cargar los proyectos en los proyectosvista
			for (int i = 0; i < proyectos.size(); i++) {
				ProjectListJSON pro = new ProjectListJSON(proyectos.get(i).getIdProject(),proyectos.get(i).getName() , proyectos.get(i).getIdClient(), proyectos.get(i).getUser_idUser());
				proyectVista.add(pro);
			}
			//Cargar los proyectos con sus respectivos presupuestos
			for (int i = 0; i < proyectVista.size(); i++) {
				for (int j = 0; j < presupuestos.size(); j++) {
					if (proyectVista.get(i).getIdProject()==presupuestos.get(j).getIdProject()) {
						proyectVista.get(i).addPresupuestos(presupuestos.get(j));
					}
				}
			}
			
			//Cargar los proyectosvista a los clientesvista
			for (int i = 0; i < clienteVista.size(); i++) {
				for (int j = 0; j < proyectVista.size(); j++) {
					if (clienteVista.get(i).getIdClient()==proyectVista.get(j).getIdClient()) {
						clienteVista.get(i).addProyectos(proyectVista.get(j));
						break;
					}
				}
			}
			
			//Cargar los contactos a los clientesvista
			for (int i = 0; i < clienteVista.size(); i++) {
				for (int j = 0; j < contactos.size(); j++) {
					if (clienteVista.get(i).getIdClient()==contactos.get(j).getIdClient()) {
						clienteVista.get(i).addContactos(contactos.get(j));
						break;
					}
				}
			}
			
			//Cargar las direccionesvista a los clientesvista
			for (int i = 0; i < clienteVista.size(); i++) {
				for (int j = 0; j < addressVista.size(); j++) {
					if (clienteVista.get(i).getIdClient()==addressVista.get(j).getIdClient()) {
						clienteVista.get(i).addDirecciones(addressVista.get(j));
						break;
					}
				}
			}
			obj.put("list", "true");
			obj.put("validate", "true");
			obj.putOnce("clientes", clienteVista);
			obj.put("status", "Listar clientes ok");
			return obj;
		}else{
			obj.put("list", "false");
			obj.put("validate", "true");
			obj.put("status", "error al listar los Clientes. Error en base de datos");
			return obj;
		}
			
	}

	public static JSONObject insertClient(Client client) {
		JSONObject obj = new JSONObject();
		List<Client> clientes = DAOClient.getClient();
		if (clientes!=null) {
			for (int i = 0; i < clientes.size(); i++) {
				if (clientes.get(i).getNIT().toLowerCase().equals(client.getNIT().toLowerCase())) {
					obj.put("insert", "false");
					obj.put("validate", "true");
					obj.put("status", "Error al insertar. Ya existe un cliente con el nit "+client.getNIT());
					return obj;
				}
			}
		}else{
			obj.put("insert", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al insertar el cliente en la base de datos.");
			return obj;
		}
		
		if (DAOClient.insertClient(client)) {
			Client c = DAOClient.getClientByNIT(client.getNIT());
			if (c!=null) {
				obj.put("insert", "true");
				obj.put("validate", "true");
				obj.put("idClient", c.getIdClient());
				obj.put("status", "Se insertó correctamente.");
				return obj;
			}else{
				obj.put("insert", "true");
				obj.put("validate", "true");
				obj.put("status", "Se insertó correctamente. Error al obtener el id del cliente.");
				return obj;
			}
		}else{
			obj.put("insert", "false");
			obj.put("validate", "true");
			obj.put("status", "Error al insertar el cliente en la base de datos.");
			return obj;
		}
		
	}

	public static JSONObject updateClient(Client client) {
		JSONObject obj = new JSONObject();
		if (DAOClient.updateClient(client)) {
			obj.put("update", "true");
			obj.put("validate", "true");
			obj.put("status", "Cliente actualizado correctamente.");
			return obj;
		}else{
			obj.put("update", "false");
			obj.put("validate", "true");
			obj.put("status", "Error actualizar el cliente en la base de datos.");
			return obj;
		}
	}

	public static JSONObject deleteClient(String idClient) {
		// TODO Auto-generated method stub
		return null;
	}

}
