package Services;

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

@Path("/AppLoginAuthentication")
public class LoginAuthen {
	@GET
	@Path("/login")
	@Produces("application/json")
	public Response prueba(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
				@DefaultValue("null") @QueryParam("user") String user, 
				@DefaultValue("null") @QueryParam("pass") String pass){
		System.out.println(request.getLocalAddr()+" - "+request.getRemoteAddr()+"  - "+referer);
		JSONObject account = new JSONObject();
		account.put("user", user);
		account.put("pass", pass);
		return Response.ok(account.toString()).header("Access-Control-Allow-Origin", "*").build();
	
	}
	

}
