package logic;

import java.math.BigDecimal;
import java.math.BigInteger;

public class App {

	public static void main(String[] args) {
		
		BigInteger a = new BigInteger("100000010101019879879801001");
		BigDecimal e = new BigDecimal(a);
								 
		int  c = 1000000000;
		long b = Long.parseLong("9223372036854775807");
		double f = 1231912931923123.123123124;
		System.out.println(b);
		//System.out.println(MD5Encryption.getMD5("123456"));
	}
}
