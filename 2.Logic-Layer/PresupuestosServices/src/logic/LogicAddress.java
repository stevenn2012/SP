package logic;

import java.util.List;

import org.json.JSONObject;

import dao.DAOAddress;
import vo.Address;

public class LogicAddress {

	public static JSONObject getAddressesJSON() {
		JSONObject obj = new JSONObject();
		List<Address> addresses = DAOAddress.getAddress();
		if (addresses != null) {
			obj.putOnce("addresses", addresses);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar direcciones");
			return obj;
		}
	}

	public static Object createAddress(Address address) {
		JSONObject obj = new JSONObject();
		List<Address> addresses = DAOAddress.getAddress();
				
		if (DAOAddress.insertAddress(address)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			addresses = DAOAddress.getAddress();
			if (addresses==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id de la direccion.");
				return obj;
			}
			for(int i = 0; i < addresses.size(); i++) {
				if (addresses.get(i).getAddress().toLowerCase().equals(address.getAddress().toLowerCase())) {
					obj.remove("idAddress");
					obj.put("idAddress", addresses.get(i).getIdAddress());
				}
			}
			obj.put("status", "Se ha insertado correctamente la direccion.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente la direccion.");
			return obj;
		}
	}

}
