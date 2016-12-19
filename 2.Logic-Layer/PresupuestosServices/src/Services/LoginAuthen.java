package Services;

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

import Logic.UsersLogic;

@Path("/AppLoginAuthentication")
public class LoginAuthen {
	
	private String[] urlAccess = {"http://localhost"};
	
	@GET
	@Path("/login")
	@Produces("application/json")
	public Response prueba(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
				@DefaultValue("null") @QueryParam("user") String user, 
				@DefaultValue("null") @QueryParam("pass") String pass){
		System.out.println(request.getLocalAddr()+" - "+request.getRemoteAddr()+"  - "+referer);
				
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to log in from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("user", user);
			account.put("pass", pass);
			return Response.ok(UsersLogic.login(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}	
	}
	
	public int verifyAccess(String referer){
		if(referer != null) {
			for (int i = 0; i < this.urlAccess.length; i++) 
				if(referer.indexOf(this.urlAccess[i])==0) return i;
		}
		return -1;
	}
	

}
