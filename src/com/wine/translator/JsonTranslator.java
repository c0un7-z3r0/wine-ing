package com.wine.translator;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Can convert Json to Object and vice versa
 */
public class JsonTranslator {

	/**
	 * Json to Object
	 * 
	 * @param jsonMap
	 * @return
	 * @throws Exception
	 */
	public static Object jsonToObject(Map<String, String[]> jsonMap)
			throws Exception {

		// list of Objects
		List<String> classes = new ArrayList<String>();
		classes.add("com.wine.xml.Wine");
		classes.add("com.wine.xml.WineIng");
		classes.add("com.wine.xml.WineSpecific");
		classes.add("com.wine.xml.WineOrder");

		// json keys
		Set<String> keySet = jsonMap.keySet();
		keySet.remove("action");

		// the class which will be used for translation
		Class<?> useThisClass = null;

		// find the class to use
		for (String checkClass : classes) {

			Class<?> myClass = Class.forName(checkClass);
			Object object = myClass.newInstance();
			// get the fields in that class
			Field[] declaredFields = object.getClass().getDeclaredFields();

			Set<String> fieldNames = new HashSet<String>();
			for (Field field : declaredFields) {
				fieldNames.add(field.getName());
			}
			int same = 0;
			int length = keySet.size();
			// if name of field is in keyset increase same
			for (String value : keySet) {
				if (fieldNames.contains(value)) {
					same++;
				}
			}

			// if same is the same as the length of the jsons keys it is the
			// class we want
			// to use
			if (same == length) {
				useThisClass = myClass;
			}

		}
		// if class is null then throw exception
		if (useThisClass == null) {
			throw new Exception("JSONTranslator: found no matching class!");
		}
		// create a new instance of the class
		Object useThisObj = useThisClass.newInstance();

		Field[] declaredFieldsUse = useThisObj.getClass().getDeclaredFields();

		// fill the fields of class with json values
		for (String key : keySet) {

			for (Field field : declaredFieldsUse) {

				if (field.getName().equals(key)) {
					field.setAccessible(true);
					field.set(useThisObj, jsonMap.get(key)[0]);
				}

			}

		}
		// return the filled class
		return useThisObj;
	}

	/**
	 * Receives Object and returns a json string
	 * 
	 * @param obj
	 * @return String (Json Format)
	 * @throws Exception
	 */
	public static String listToJson(Object obj) throws Exception {

		String returnVal = "";

		// get object name
		String objName = obj.getClass().getSimpleName();
		Class<? extends Object> objClass = obj.getClass();

		// if object is ...
		if (objClass.getName() == "java.lang.String") {
			returnVal = "{" + handleStringToJson("message", (String) obj) + "}";

		} else if (objClass.getName() == "java.util.ArrayList") {
			returnVal = "{\"" + objName + "\": ["
					+ handleArrayListToJson((List<?>) obj) + "]}";
		} else {
			throw new Exception("JsonTranslator: Not Implemented!");

		}
		return returnVal;
	}

	/**
	 * creates json field from name and string
	 * 
	 * @param name
	 *            String Name of JSON field
	 * @param str
	 *            String Value of JSON field
	 * @return String JSON field
	 */
	private static String handleStringToJson(String name, String str) {
		return "\"" + name + "\":\"" + str + "\"";

	}

	/**
	 * Creates from List Json
	 * 
	 * @param list
	 *            List to create JSON
	 * @return String JSON
	 */
	private static String handleArrayListToJson(List<?> list) {
		String json = "";

		for (Object varObj : list) {
			// String objClassName = varObj.getClass().getSimpleName();
			json += "{";
			// get class of object
			Class<? extends Object> varObjClass = varObj.getClass();
			// get declared field of that object
			Field[] objFields = varObjClass.getDeclaredFields();
			// counter
			int position = 0;

			// for every declaredField
			for (Field fieldObj : objFields) {
				// get name of field
				String varObjfieldName = fieldObj.getName();
				fieldObj.setAccessible(true);

				try {
					// get value of the object
					Object varObjnewObj = fieldObj.get(varObj);
					if (varObjnewObj != null) {
						// if it is string
						if (varObjnewObj.getClass().getName() == "java.lang.String") {
							json += handleStringToJson(varObjfieldName,
									(String) varObjnewObj);

						}
						// if it is arraylist
						else if (varObjnewObj.getClass().getName() == "java.util.ArrayList") {
							// add to json the name of the field
							json += "\"" + varObjfieldName + "\"" + ": [";
							// iterate through each object in list
							for (Object inArrayList : (ArrayList<?>) varObjnewObj) {
								// create a temp list to iterate through
								ArrayList<?> tempList = (ArrayList<?>) varObjnewObj;
								// if object is string attach it to json
								if (inArrayList.getClass().getName() == "java.lang.String") {
									if (tempList.indexOf(inArrayList) != 0) {
										json += ",";
									}
									json += "\"" + (String) inArrayList + "\"";

								}

							}
							// close the json array
							json += "]";
						}
						// if it is not the last at a comma to json
						if (position != objFields.length - 1) {
							json += ",";
						}
					} else {
						// remove last char in json
						json = json.substring(0, json.length() - 1);
					}
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
				position++;
			}
			// close the whole json
			json += "}";
			// add a comma if it is not last object
			if (list.indexOf(varObj) != (list.size() - 1)) {
				json += ",";
			}

		}

		return json;

	}

}
