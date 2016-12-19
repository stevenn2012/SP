package Logic;

import java.math.BigInteger;
import java.util.HashMap;
import org.json.JSONObject;

import DAO.DAOArea;
import DAO.DAOUser;
import VO.AccountLogin;
import VO.User;

public class UsersLogic {

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
			obj.put("document", user.getDocument());
			obj.put("name", user.getName());
			obj.put("username", user.getUserName());
			obj.put("area", DAOArea.getAreaByIdArea(user.getIdArea()));
			obj.put("loginCode", generateLoginCode(username, password));
			loginAccounts.put(user.getUserName().toLowerCase(), 
					new AccountLogin(user.getName(), user.getUserName(), obj.getString("loginCode"), ip, obj.getInt("rol")));
			return obj;
		}else{
			obj.put("access", false);
			return obj;
		}
	}
	
	private static String generateLoginCode(String user, String pass){
		logAccounts=logAccounts.add(new BigInteger("1"));
		return MD5Encryption.getMD5(MD5Encryption.getMD5(logAccounts+"")+MD5Encryption.getMD5(user)+MD5Encryption.getMD5(pass));
	}
	
	public static JSONObject valLogin(String ip, JSONObject account){
		String username = account.getString("user").toLowerCase();
		String loginCode = account.getString("loginCode");
		System.out.print("\tReceived -> User: '"+username+"', loginCode: **** ");
		AccountLogin acc= loginAccounts.get(username);
		JSONObject obj = new JSONObject();
		obj.put("validate", "false");
		if(acc != null){
			if(username.equals(acc.getUsername().toLowerCase()) && loginCode.equals(acc.getLoginCode()) && ip.equals(acc.getIp())){
				obj.remove("validate");
				obj.put("validate", "true");
			}
		}
		System.out.println(" -> Validate Login: "+obj.getString("validate"));
		return obj;
	}

	public static JSONObject logOut(String ip, JSONObject account) {
		String username = account.getString("user").toLowerCase();
		String loginCode = account.getString("loginCode");
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

	public static JSONObject createUser(String ip, JSONObject account) {
		String name = account.getString("name");
		String username = account.getString("username");
		String password = account.getString("password");
		String rol = account.getString("rol");
		String user = account.getString("user");
		JSONObject obj = new JSONObject();
		obj.put("permit", "false");
		obj.put("create", "false");
		if(valLogin(ip, account).getString("validate").equalsIgnoreCase("true")){
			if(loginAccounts.get(user.toLowerCase()).getRol() == 1){
				obj.remove("permit");
				obj.put("permit", "true");
				int rolnumber = 0;
				if(rol.equalsIgnoreCase("admin")){
					rolnumber = 1;
				}else if(rol.equalsIgnoreCase("empleado")){
					rolnumber = 2;
				}
				obj.remove("create");
				//obj.put("create", DAOUser.insertUser(document, name, username, password, idArea));
			}else{
				obj.remove("permit");
				obj.remove("create");
				obj.put("permit", "false");
				obj.put("create", "false");
			}
		}
		return obj;
	}
}
