package logic;

public class TextValidation {
	
	public static String cambiarTildes(String palabra){
		palabra = palabra.toLowerCase();
		palabra = palabra.replace("�", "a");
		palabra = palabra.replace("�", "e");
		palabra = palabra.replace("�", "i");
		palabra = palabra.replace("�", "o");
		palabra = palabra.replace("�", "u");
		return palabra;
	}

}
