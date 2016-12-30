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
import logic.LogicLoginAuthent;

@Path("/AppLoginAuthentication")
public class WebServiceLoginAuthen {
	
	private String[] urlAccess = ConectionData.getUrlAccess();
	
	@GET
	@Path("/login")
	@Produces("application/json")
	public Response loginApp(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
				@DefaultValue("null") @QueryParam("user") String user, 
				@DefaultValue("null") @QueryParam("pass") String pass){
		System.out.println("\nLOGIN USUARIO");
		System.out.println("\t"+new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to log in from : "+referer);
		System.out.println("\nUser "+user+ " pass "+pass);
		
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("user", user);
			account.put("pass", pass);
			return Response.ok(LogicLoginAuthent.login(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}	
	}
	
	@GET
	@Path("/validation")
	@Produces("application/json")
	public Response validatelogin(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println("\nVALIDACION USUARIO");
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);
			
			System.out.println("\n\n");
			System.out.println(logincode);
			System.out.println(username);
			
			return Response.ok(LogicLoginAuthent.valLogin(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/logout")
	@Produces("application/json")
	public Response logout(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String user, 
	          @DefaultValue("null") @QueryParam("logincode") String loginCode
	          ) {
		System.out.println("\nLOG OUT USUARIO");
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to log out from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", user);
			account.put("logincode", loginCode);
			return Response.ok(LogicLoginAuthent.logOut(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
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
