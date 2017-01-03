package logic;

import java.util.Date;
import java.util.HashMap;
import org.json.JSONObject;
import dao.DAORoll;
import dao.DAOUser;
import vo.AccountLogin;
import vo.Roll;
import vo.User;


public class LogicLoginAuthent {

	private static HashMap<String, AccountLogin> loginAccounts = new HashMap<String, AccountLogin>();
	
	public static JSONObject login(String ip, JSONObject account){
		String username = account.getString("user");
		String password = account.getString("pass");
		System.out.print("\tReceived -> User: '"+username+"', pass: **** ");
		User user = DAOUser.getUserByUsernameAndPassword(username, password);
		JSONObject obj = new JSONObject();
		if(user != null){
			System.out.println(" -> The user was found");
			if (!user.isActive()) {
				obj.put("access", false);
				obj.put("status", "Usuario inactivo.");
				return obj;
			}
			obj.put("access", true);
			obj.put("namel", user.getName());
			obj.put("username", user.getUserName());
			obj.put("logincode", generateLoginCode(username, user.getUserName()));
			String roll = DAORoll.getRoleByIdUser(user.getIdUser()).getName();
			if (roll == null) {
				obj.put("access", false);
				obj.put("status", "Error de conexion en la base de datos");
				return obj;
			}
			obj.put("roll", roll);
			loginAccounts.put(user.getUserName().toLowerCase(), 
					new AccountLogin(user.getUserName(), obj.getString("logincode"), ip,roll));
			return obj;
		}else{
			obj.put("access", false);
			return obj;
		}
	}
		
	public static JSONObject valLogin(String ip, JSONObject account){
		String username = account.getString("username").toLowerCase();
		String logincode = account.getString("logincode");
		System.out.print("\tReceived -> User: '"+username+"', loginCode: **** ");
		AccountLogin acc= loginAccounts.get(username);
		System.out.println("\n\n");
		System.out.println(acc.getLoginCode()+" "+logincode);
		System.out.println(acc.getUsername()+" "+username);
		System.out.println(acc.getIp()+" "+ip);
		JSONObject obj = new JSONObject();
		obj.put("validate", "false");
		if(acc != null){
			if(username.equals(acc.getUsername().toLowerCase()) && logincode.equals(acc.getLoginCode()) && ip.equals(acc.getIp())){
				User usuario = DAOUser.getUserByUsername(username);
				Roll roll = DAORoll.getRoleByIdUser(usuario.getIdUser());
				obj.put("roll", acc.getRoll());
				if (usuario!=null && roll!=null) {
					System.out.println("VALIDACION ROLL\n"+loginAccounts.get(username).getRoll()+"\n"+roll.getName());
					if (!acc.getRoll().toLowerCase().equals(roll.getName())) {
						loginAccounts.get(username).setRoll(roll.getName());
						obj.remove("roll");
						obj.put("roll", loginAccounts.get(username).getRoll());
					}
					if (!usuario.isActive()) {
						obj.put("status", "inactive");
						return logOut(ip, account);
					}
				}else{
					obj.put("status", "Error de validación");
					return obj;
				}
				obj.remove("validate");
				obj.put("validate", "true");
				obj.put("status", "active");
				return obj;
			}
		}
		System.out.println(" -> Validate Login: "+obj.getString("validate"));
		obj.put("status","Error de validación");
		return obj;
	}
	
	public static JSONObject logOut(String ip, JSONObject account) {
		String username = account.getString("username").toLowerCase();
		String loginCode = account.getString("logincode");
		System.out.print("\tReceived -> User: '"+username+"', loginCode: **** ");
		AccountLogin acc= loginAccounts.get(username);
		JSONObject obj = new JSONObject();
		obj.put("logout", "false");
		if(acc != null){
			if(username.equals(acc.getUsername().toLowerCase()) && loginCode.equals(acc.getLoginCode()) && ip.equals(acc.getIp())){
				loginAccounts.remove(username.toLowerCase());
				obj.remove("logout");
				obj.put("logout", "true");
			}
		}
		System.out.println(" -> Log out: "+obj.getString("logout"));
		return obj;
	}
	
	private static String generateLoginCode(String user, String name){
		Date logAccounts = new Date();
		return MD5Encryption.getMD5(MD5Encryption.getMD5(logAccounts.toString())+MD5Encryption.getMD5(user)+MD5Encryption.getMD5(name));
	}
	
}
