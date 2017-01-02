package services;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import org.json.JSONObject;
import dao.ConectionData;
import logic.LogicAddress;
import logic.LogicLoginAuthent;
import vo.Address;

@Path("/AppAddressCRUD")

public class WebServiceAddress {

private String[] urlAccess = ConectionData.getUrlAccess();
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR DIRECCIONES");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				addresses = LogicAddress.getAddressesJSON();
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createAddress(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("address") String address,
	          @DefaultValue("null") @QueryParam("idProvider") String idProvider,
	          @DefaultValue("null") @QueryParam("idCity") String idCity,
	          @DefaultValue("null") @QueryParam("idClient") String idClient
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR DIRECCIONES");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject addresses = new JSONObject();
			addresses.put("username", username);
			addresses.put("logincode", logincode);	
			addresses = LogicLoginAuthent.valLogin(request.getRemoteAddr(), addresses);
			if (addresses.getString("validate").equals("true")) {
				if (idClient.equals("null")) {
					Address city = new Address(0, address, Long.parseLong(idProvider),Long.parseLong(idCity),0);
					return Response.ok(LogicAddress.createAddress(city).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
				}				
				if (idProvider.equals("null")) {
					Address city = new Address(0, address, 0,Long.parseLong(idCity),Long.parseLong(idClient));
					return Response.ok(LogicAddress.createAddress(city).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
				}
				addresses.put("list", "false");
				addresses.put("status", "id provedor o id cliente erroneos");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando addresses\n");
				return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject addresses = new JSONObject();
			addresses.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(addresses.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	public int verifyAccess(String referer){
		if(referer != null) {
			for (int i = 0; i < urlAccess.length; i++) {
				System.out.println(urlAccess[i]+" "+referer.indexOf(urlAccess[i]));
				if(referer.indexOf(urlAccess[i])==0) return i;
			}
		}
		return -1;
	}

}
