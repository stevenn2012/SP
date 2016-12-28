package vo;

public class AccountLogin{
	private String username;
	private String loginCode;
	private String ip;
	
	public AccountLogin(String username, String loginCode, String ip) {
		this.username = username;
		this.loginCode = loginCode;
		this.ip = ip;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getLoginCode() {
		return loginCode;
	}
	
	public void setLoginCode(String loginCode) {
		this.loginCode = loginCode;
	}
	
	public String getIp() {
		return ip;
	}
	
	public void setIp(String ip) {
		this.ip = ip;
	}

	@Override
	public String toString() {
		return "AccountLogin [username=" + username + ", loginCode=" + loginCode + ", ip=" + ip + "]";
	}
	
}