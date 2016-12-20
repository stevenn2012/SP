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
import Logic.LoginAuthentLogic;

@Path("/Users")
public class LoginServices {

	private String[] urlAccess = {"http://localhost"};
	
	@GET
	@Path("/prueba")
	@Produces("application/json")
	public Response prueba(@DefaultValue("null") @QueryParam("user") String user, 
	          @DefaultValue("null") @QueryParam("pass") String pass,
	          @Context HttpServletRequest request, 
	          @HeaderParam("Referer") String referer){
		System.out.println(referer);
		JSONObject account = new JSONObject();
		account.put("user", user);
		account.put("pass", pass);
		return Response.ok(account.toString()).header("Access-Control-Allow-Origin", "*").build();
	
	}
	
	@GET
	@Path("/login")
	@Produces("application/json")
	public Response login(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("user") String user, 
	          @DefaultValue("null") @QueryParam("pass") String pass
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to log in from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("user", user);
			account.put("pass", pass);
			return Response.ok(LoginAuthentLogic.login(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
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

	@GET
	@Path("/vallogin")
	@Produces("application/json")
	public Response validatelogin(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("user") String user, 
	          @DefaultValue("null") @QueryParam("loginCode") String loginCode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("user", user);
			account.put("loginCode", loginCode);
			return Response.ok(LoginAuthentLogic.valLogin(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/logout")
	@Produces("application/json")
	public Response logout(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("user") String user, 
	          @DefaultValue("null") @QueryParam("loginCode") String loginCode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to log out from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("user", user);
			account.put("loginCode", loginCode);
			//return Response.ok(UsersLogic.logOut(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			return null;
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/createUser")
	@Produces("application/json")
	public Response createUser(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("username") String username, 
			  @DefaultValue("null") @QueryParam("password") String password,
			  @DefaultValue("null") @QueryParam("rol") String rol,
			  @DefaultValue("null") @QueryParam("user") String user, 
	          @DefaultValue("null") @QueryParam("loginCode") String loginCode	          
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to Create User from : "+referer);
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject account = new JSONObject();
				account.put("name", name);
				account.put("username", username);
				account.put("password", password);
				account.put("rol", rol);
				account.put("user", user);
				account.put("loginCode", loginCode);
			
			//return Response.ok(UsersLogic.createUser(request.getRemoteAddr(), account).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			return null;	
		}else{
			System.out.println(", Access denied\n");
			return Response.ok().header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
}
