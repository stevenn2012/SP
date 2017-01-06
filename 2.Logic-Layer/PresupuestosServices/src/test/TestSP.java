package test;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import logic.MD5Encryption;
import logic.TextValidation;

public class TestSP {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void testTextValidation() {
		assertEquals("bogota", TextValidation.cambiarTildes("Bogotá"));
	}
	
	@Test
	public void testPasswordpara1234() {
		assertEquals("81dc9bdb52d04dc20036dbd8313ed055",MD5Encryption.getMD5("1234") );
	}
}
