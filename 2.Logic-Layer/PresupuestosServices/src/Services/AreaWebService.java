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

import Logic.AreaLogic;
import Logic.LoginAuthentLogic;
import VO.Area;


@Path("/AppAreaCRUD")

public class AreaWebService {
	
private String[] urlAccess = {"http://localhost","null"};
	
	@GET
	@Path("/create")
	@Produces("application/json")
	public Response createArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode,
	          @DefaultValue("null") @QueryParam("nombreArea") String nombreArea
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nCREAR AREA");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LoginAuthentLogic.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				Area area = new Area(0, nombreArea);
				return Response.ok(AreaLogic.createArea(area).toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
		}
    }
	
	@GET
	@Path("/list")
	@Produces("application/json")
	public Response listArea(@Context HttpServletRequest request, @HeaderParam("Referer") String referer,
	          @DefaultValue("null") @QueryParam("username") String username, 
	          @DefaultValue("null") @QueryParam("logincode") String logincode
	          ) {
		System.out.println(new Date()+":\n\tRemote Address: "+request.getRemoteAddr()+", Local Address: "+request.getLocalAddr());
		System.out.print("\tAttempt to validate log in from : "+referer);
		System.out.print("\nLISTAR AREAS");
		int verifyAccess = verifyAccess(referer);
		if( verifyAccess != -1){
			System.out.println(", Access granted");  
			JSONObject areas = new JSONObject();
			areas.put("username", username);
			areas.put("logincode", logincode);	
			areas = LoginAuthentLogic.valLogin(request.getRemoteAddr(), areas);
			if (areas.getString("validate").equals("true")) {
				areas = AreaLogic.getAreasJSON();
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", urlAccess[verifyAccess]).build();
			}else{
				System.out.println(", Error cargando areas\n");
				return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
			}
			
		}else{
			JSONObject areas = new JSONObject();
			areas.put("validate", "false");
			System.out.println(", Access denied\n");
			return Response.ok(areas.toString()).header("Access-Control-Allow-Origin", urlAccess[0]).build();
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
