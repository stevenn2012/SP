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

import logic.LoginAuthentLogic;
import logic.ProviderLogic;


@Path("/AppProviderCRUD")

public class ProviderWebService {

private String[] urlAccess = {"http://localhost","null"};
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listProviderWS(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nEN LISTAR PROVEEDORES");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LoginAuthentLogic.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = ProviderLogic.getProvidersJSON();
				account.put("validate", "true");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	public int verifyAccess(String referer){
		if(referer != null) {
			for (int i = 0; i < this.urlAccess.length; i++) {
				System.out.println(this.urlAccess[i]+" "+referer.indexOf(this.urlAccess[i]));
				if(referer.indexOf(this.urlAccess[i])==0) return i;
			}
		}
		return -1;
	}
	
}
