package santa.publicidad.Services;

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

import santa.publicidad.Logic.LoginAuthentLogic;
import santa.publicidad.Logic.RollLogic;


@Path("/AppRollCRUD")

public class RollWebService {

private String[] urlAccess = {"http://localhost","null"};
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listUsersWS(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR ROLES");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject roles = new JSONObject();
			roles.put("username", username);
			roles.put("logincode", logincode);	
			roles = LoginAuthentLogic.valLogin(request.getRemoteAddr(), roles);
			if (roles.getString("validate").equals("true")) {
				roles = RollLogic.getRolesJSON();
				return Response.ok(roles.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando Roles\n");
				return Response.ok(roles.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject roles = new JSONObject();
			roles.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(roles.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
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
