package logic;

import java.util.List;

import org.json.JSONObject;

import dao.DAOContact;
import vo.Address;
import vo.Contact;

public class LogicContact {

	public static JSONObject getContactsJSON() {
		JSONObject obj = new JSONObject();
		List<Contact> contacts = DAOContact.getContact();
		if (contacts != null) {
			obj.putOnce("contacts", contacts);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar contactos");
			return obj;
		}
	}

	public static Object createContact(Contact contact) {
		JSONObject obj = new JSONObject();
		List<Contact> contacts = DAOContact.getContact();
				
		if (DAOContact.insertContact(contact)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			contacts = DAOContact.getContact();
			if (contacts==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id del contacto.");
				return obj;
			}
			for(int i = 0; i < contacts.size(); i++) {
				if (contacts.get(i).getName().toLowerCase().equals(contact.getName().toLowerCase())) {
					obj.remove("idcontact");
					obj.put("idContact", contacts.get(i).getIdContact());
				}
			}
			obj.put("status", "Se ha insertado correctamente la direccion.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el contacto.");
			return obj;
		}
	}

}
