package Data;

public class AccountLogin{
	private String nameEmployee;
	private String username;
	private String loginCode;
	private int rol;
	private String ip;
	
	public AccountLogin(String nameEmployee, String username, String loginCode, String ip, int rol) {
		this.nameEmployee = nameEmployee;
		this.username = username;
		this.loginCode = loginCode;
		this.rol = rol;
		this.ip = ip;
	}

	public int getRol() {
		return rol;
	}

	public void setRol(int rol) {
		this.rol = rol;
	}

	public String getNameEmployee() {
		return nameEmployee;
	}
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
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
		return "AccountLogin [nameEmployee=" + nameEmployee + ", username=" + username + ", loginCode=" + loginCode
				+ ", rol=" + rol + ", ip=" + ip + "]";
	}
}