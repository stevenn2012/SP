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
import logic.LogicCountry;
import logic.LogicLoginAuthent;
import logic.LogicUsers;
import vo.Country;
import vo.User;

@Path("/AppCountryCRUD")

public class WebServiceCountry {

	private String[] urlAccess = ConectionData.getUrlAccess();
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listCountry(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR PAISES");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject countries = new JSONObject();
			countries.put("username", username);
			countries.put("logincode", logincode);	
			countries = LogicLoginAuthent.valLogin(request.getRemoteAddr(), countries);
			if (countries.getString("validate").equals("true")) {
				countries = LogicCountry.getCountriesJSON();
				return Response.ok(countries.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando countries\n");
				return Response.ok(countries.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject countries = new JSONObject();
			countries.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(countries.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createCountry(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("countryCode") String countrycode,
	          @DefaultValue("null") @QueryParam("cname") String cname
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR COUNTRY");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject countries = new JSONObject();
			countries.put("username", username);
			countries.put("logincode", logincode);	
			countries = LogicLoginAuthent.valLogin(request.getRemoteAddr(), countries);
			if (countries.getString("validate").equals("true")) {
				Country country = new Country(0, countrycode, cname);
				return Response.ok(LogicCountry.createCountry(country).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando countries\n");
				return Response.ok(countries.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject countries = new JSONObject();
			countries.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(countries.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/delete")
	@Produces("application/json")
	public Response deleteCountry(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idCountry") String idCountry, 
			  @DefaultValue("null") @QueryParam("username") String username,
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.print(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\tBORRAR PAIS");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.print(", Access granted");  
			JSONObject country = new JSONObject();
			country.put("username", username);
			country.put("logincode", logincode);	
			country = LogicLoginAuthent.valLogin(request.getRemoteAddr(), country);
			if (country.getString("validate").equals("true")) {
				return Response.ok(LogicCountry.deleteCountry(idCountry).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.print(", Error cargando Usuarios\n");
				return Response.ok(country.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject country = new JSONObject();
			country.put("access", "false");
			System.out.print(", Access denied\n");
			return Response.ok(country.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/update")
	@Produces("application/json")
	public Response updateCountry(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
			  @DefaultValue("null") @QueryParam("idCountry") String idcountry,
			  @DefaultValue("null") @QueryParam("countryCode") String countrycode, 
			  @DefaultValue("null") @QueryParam("name") String name,
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
				Country country = new Country(Long.parseLong(idcountry), countrycode, name);
				return Response.ok(LogicCountry.updateCountry(country,Long.parseLong(idcountry)).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
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
