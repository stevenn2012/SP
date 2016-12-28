package logic;

import org.json.JSONObject;

public class App {

	public static void main(String[] args) {
		
		JSONObject account = new JSONObject();
			account.put("user", "stevenn2012");
			account.put("pass", "123456");
			String ip = "127.0.0.1";
		System.out.println(LoginAuthentLogic.login(ip, account));
		
		System.out.println(MD5Encryption.getMD5("123456"));
	}
}
