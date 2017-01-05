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
import logic.LogicUsers;
import vo.User;

@Path("/AppUsersCRUD")

public class WebServiceUsers {

	private String[] urlAccess = ConectionData.getUrlAccess();
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listUsers(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.println("\tAttempt to validate log in from : "+referer);
		System.out.println("\tEn listar usuarios\nEN LISTAR USUARIOS");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicUsers.getUsersJSON();
				account.put("validate", "true");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("validate", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createUser(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("document") String document, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("usernameObj") String usernameObj,
			  @DefaultValue("null") @QueryParam("password") String password, 
	          @DefaultValue("null") @QueryParam("idarea") String idarea,
	          @DefaultValue("null") @QueryParam("email") String email,
	          @DefaultValue("null") @QueryParam("idRol") String idRol,
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("username") String username
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn INSERTAR USUARIO");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				User usuario = new User(Long.parseLong("0"), document, name, usernameObj, password, Long.parseLong(idarea), email,true);
				return Response.ok(LogicUsers.insertUser(usuario,Long.parseLong(idRol)).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteUser(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idUser") String idUser, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR USUARIO");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				account = LogicUsers.deleteUser(idUser,username);
				if (account.getString("delete").equals("true")) {
					System.out.println(account.get("status"));
					LogicLoginAuthent.logOutDeletedAccount(account.getString("usernameDeleted"));
				}
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateUser(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idUser") String idUser,
			  @DefaultValue("null") @QueryParam("document") String document, 
			  @DefaultValue("null") @QueryParam("name") String name,
			  @DefaultValue("null") @QueryParam("usernameObj") String usernameObj,
			  @DefaultValue("null") @QueryParam("password") String password, 
	          @DefaultValue("null") @QueryParam("idarea") String idarea,
	          @DefaultValue("null") @QueryParam("email") String email,
	          @DefaultValue("null") @QueryParam("idRol") String idRol,
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("username") String username
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tEn EDITAR USUARIO");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject account = new JSONObject();
			account.put("username", username);
			account.put("logincode", logincode);	
			account = LogicLoginAuthent.valLogin(request.getRemoteAddr(), account);
			if (account.getString("validate").equals("true")) {
				User usuario = new User(Long.parseLong(idUser), document, name, usernameObj, password, Long.parseLong(idarea), email, true);
				return Response.ok(LogicUsers.updateUser(usuario,Long.parseLong(idRol)).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject account = new JSONObject();
			account.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(account.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
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
