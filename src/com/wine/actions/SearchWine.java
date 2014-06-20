package com.wine.actions;

import java.io.File;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Map;

import com.wine.xml.Wine;
import com.wine.xml.WineSpecific;

public class SearchWine implements Actions<ArrayList<?>> {

	@SuppressWarnings("unchecked")
	@Override
	public ArrayList<?> execute(File file, Object paramIn) throws Exception {
		String searchTerm = ((Map<String, String[]>) paramIn).get("search")[0];
		String searchType = ((Map<String, String[]>) paramIn).get("searchType")[0];
		ArrayList<?> result = new ArrayList<Object>();

		System.out.println(searchType);

		if (searchType.equals("specific")) {

			System.out.println("sepcifics");

			GetAllSpecific getAllSpecifics = new GetAllSpecific();
			ArrayList<WineSpecific> specificList = getAllSpecifics.execute(
					file, paramIn);
			ArrayList<WineSpecific> specificResult = new ArrayList<WineSpecific>();
			System.out.println(specificList.size());
			for (WineSpecific wineSpecific : specificList) {
				Field[] fields = wineSpecific.getClass().getDeclaredFields();

				for (Field field : fields) {
					System.out.println(field.getName());
					if (field.getName() != "categories") {
						field.setAccessible(true);
						if (searchTerm.equals(field.get(wineSpecific)
								.toString())) {
							specificResult.add(wineSpecific);
						}
					}

				}
			}
			result = specificResult;
		} else {
			GetWine getWine = new GetWine();
			ArrayList<Wine> wineList = getWine.execute(file, paramIn);
			ArrayList<Wine> wineResult = new ArrayList<Wine>();
			for (Wine wine : wineList) {
				Field[] fields = wine.getClass().getDeclaredFields();

				for (Field field : fields) {
					field.setAccessible(true);
					if (searchTerm.equals(field.get(wine).toString())) {
						wineResult.add(wine);
					}

				}
			}
			result = wineResult;

		}
		return result;

	}

}
