package logic;

import java.util.Date;
import java.util.HashMap;
import org.json.JSONObject;
import dao.DAORoll;
import dao.DAOUser;
import vo.AccountLogin;
import vo.Roll;
import vo.TimeControlAccountLogin;
import vo.User;


public class LogicLoginAuthent {

	private static HashMap<String, AccountLogin> loginAccounts = new HashMap<String, AccountLogin>();
	private static HashMap<String, TimeControlAccountLogin> attempts = new HashMap<String, TimeControlAccountLogin>();
	
	public static JSONObject login(String ip, JSONObject account){
		String username = account.getString("user");
		String password = account.getString("pass");
		JSONObject obj = new JSONObject();
		TimeControlAccountLogin attempt = attempts.get(ip+username);
		if (attempt==null) {
			attempts.put(ip+username, new TimeControlAccountLogin(ip, 0, System.currentTimeMillis(), System.currentTimeMillis()));
		}
		if (attempts.get(ip+username).getAttemptCount()>=5) {
			attempts.get(ip+username).setStopTime(System.currentTimeMillis());
			long elapsedTime = attempts.get(ip+username).getStopTime()-attempts.get(ip+username).getStartTime();
			long time = 60000;
			if (elapsedTime>time) {
				attempts.remove(ip+username);
				attempts.put(ip+username, new TimeControlAccountLogin(ip, 0, System.currentTimeMillis(), System.currentTimeMillis()));
			}else{
				System.out.println("Bloquedado: tiempo transcurrido "+elapsedTime/1000+" segundos, Wait: "+time/1000+ " segundos.");
				obj.put("access", false);
				obj.put("status", "Bloqueado. Esperar "+time/1000+" segundos. Tiempo transcurrido = "+elapsedTime/1000);
				return obj;
			}
		}
		System.out.print("\tReceived -> User: '"+username+"', pass: **** ");
		User user = DAOUser.getUserByUsernameAndPassword(username, password);
		
		System.out.println("USUARIO = "+user);
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
			attempts.remove(ip+username);
			return obj;
		}else{
			attempts.get(ip+username).setAttemptCount(attempts.get(ip+username).getAttemptCount()+1);
			System.out.println("attempt "+attempts.get(ip+username).getAttemptCount());
			if (attempts.get(ip+username).getAttemptCount()==5) {
				attempts.get(ip+username).setStartTime(System.currentTimeMillis());
				attempts.get(ip+username).setStopTime(System.currentTimeMillis());
			}
			obj.put("status", "Intentos: "+attempts.get(ip+username).getAttemptCount());
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
		JSONObject obj = new JSONObject();
		obj.put("validate", "false");
		if(acc != null){
			System.out.println(acc.getLoginCode()+" "+logincode);
			System.out.println(acc.getUsername()+" "+username);
			System.out.println(acc.getIp()+" "+ip);
			if(username.equals(acc.getUsername().toLowerCase()) && logincode.equals(acc.getLoginCode()) && ip.equals(acc.getIp())){
				User usuario = DAOUser.getUserByUsername(username);
				Roll roll = DAORoll.getRoleByIdUser(usuario.getIdUser());
				obj.put("roll", acc.getRoll());
				if (usuario!=null && roll!=null) {
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
		obj.put("status","No hay sesion de usuario");
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
	
	public static JSONObject logOutDeletedAccount(String username) {
		System.out.print("\tReceived -> User: '"+username+"', loginCode: **** ");
		System.out.println("USUARIO ELIMINADO SE DESLOGUEA A "+username);
		AccountLogin acc= loginAccounts.get(username.toLowerCase());
		JSONObject obj = new JSONObject();
		obj.put("logOutDeletedAccount", "false");
		obj.put("status", "El usuario no esta logueado");
		if(acc != null){
			loginAccounts.remove(username.toLowerCase());
			obj.remove("logOutDeletedAccount");
			obj.put("logOutDeletedAccount", "true");
			obj.remove("status");
			obj.put("status", "Se ha eliminado la sesion del "+username);
		}
		System.out.println(" -> Log out: "+obj.getString("status"));
		return obj;
	}
	
	private static String generateLoginCode(String user, String name){
		Date logAccounts = new Date();
		return MD5Encryption.getMD5(MD5Encryption.getMD5(logAccounts.toString())+MD5Encryption.getMD5(user)+MD5Encryption.getMD5(name));
	}
	
}
