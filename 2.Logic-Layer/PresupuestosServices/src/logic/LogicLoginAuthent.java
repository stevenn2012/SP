package logic;

import java.math.BigInteger;
import java.util.HashMap;
import org.json.JSONObject;

import dao.DAORoll;
import dao.DAOUser;
import vo.AccountLogin;
import vo.User;


public class LogicLoginAuthent {

	private static HashMap<String, AccountLogin> loginAccounts = new HashMap<String, AccountLogin>();
	private static BigInteger logAccounts = new BigInteger("0");
	
	public static JSONObject login(String ip, JSONObject account){
		String username = account.getString("user");
		String password = account.getString("pass");
		System.out.print("\tReceived -> User: '"+username+"', pass: **** ");
		User user = DAOUser.getUserByUsernameAndPassword(username, password);
		JSONObject obj = new JSONObject();
		if(user != null){
			System.out.println(" -> The user was found");
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
				obj.remove("validate");
				obj.put("validate", "true");
			}
		}
		System.out.println(" -> Validate Login: "+obj.getString("validate"));
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
		logAccounts=logAccounts.add(new BigInteger("1"));
		return MD5Encryption.getMD5(MD5Encryption.getMD5(logAccounts+"")+MD5Encryption.getMD5(user)+MD5Encryption.getMD5(name));
	}
	
}
