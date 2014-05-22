package com.wine.helper;

public class WineHelpers {

	/**
	 * Return a string with the current milliseconds and a random number
	 * 
	 * @return String
	 */
	public static String generateId() {
		long now = System.currentTimeMillis();
		long randomLong = Math.round(Math.random() * 89999) + 10000;
		return ("ID_" + now + "-" + randomLong);
	}
	
	
}
