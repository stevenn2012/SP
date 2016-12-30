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
import logic.LogicArea;
import logic.LogicLoginAuthent;
import vo.Area;

@Path("/AppCountryCRUD")

public class WebServiceCountry {

	private String[] urlAccess = ConectionData.getUrlAccess();
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createCountry(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("nombreArea") String nombreArea
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
				Area area = new Area(0, nombreArea);
				return Response.ok(LogicArea.createArea(area).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
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
