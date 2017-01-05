package test;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import logic.TextValidation;

public class TestClass {

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

}
