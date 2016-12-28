package vo;

import java.math.BigInteger;

public class Area {
	
	private BigInteger idArea;
	private String name;
	
	public Area(BigInteger idArea, String name) {
		this.idArea = idArea;
		this.name = name;
	}
	
	public BigInteger getIdArea() {
		return idArea;
	}
	
	public void setIdArea(BigInteger idArea) {
		this.idArea = idArea;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return "Area [idArea=" + idArea + ", name=" + name + "]";
	}
	
	
}
