package logic;

import java.util.List;
import org.json.JSONObject;
import dao.DAOProductService;
import vo.ProductService;

public class LogicProductService {

	public static JSONObject getProductServicesJSON() {
		JSONObject obj = new JSONObject();
		List<ProductService> productservices = DAOProductService.getProductService();
		if (productservices != null) {
			obj.putOnce("productservices", productservices);
			obj.put("list", "true");
			obj.put("validate", "true");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("list", "false");
			obj.put("status", "Error en listar Productos y Servicios");
			return obj;
		}
	}

	public static JSONObject createProductService(ProductService productservice) {
		JSONObject obj = new JSONObject();
		List<ProductService> productservices = DAOProductService.getProductService();
				
		if (DAOProductService.insertProductService(productservice)) {
			obj.put("validate", "true");
			obj.put("insert", "true");
			productservices = DAOProductService.getProductService();
			if (productservices==null) {
				obj.put("validate", "true");
				obj.put("insert", "true");
				obj.put("status", "Error el obtener el id del Producto o servicio.");
				return obj;
			}
			for(int i = 0; i < productservices.size(); i++) {
				if (productservices.get(i).getName().toLowerCase().equals(productservice.getName().toLowerCase())) {
					obj.remove("idProductService");
					obj.put("idProductService", productservices.get(i).getIdProductService());
				}
			}
			obj.put("status", "Se ha insertado correctamente el producto o servicio.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("insert", "false");
			obj.put("status", "No ha insertado correctamente el producto o servicio.");
			return obj;
		}
	}

	public static Object updateProductService(ProductService productservice) {
		JSONObject obj = new JSONObject();
		if (DAOProductService.updateProductService(productservice)) {
			obj.put("validate", "true");
			obj.put("update", "true");
			obj.put("status", "Actualización del producto o servicio correctamente.");
			return obj;
		}else{
			obj.put("validate", "true");
			obj.put("update", "false");
			obj.put("status", "No se ha actualizado el producto o servicio.");
			return obj;
		}
	}
}
