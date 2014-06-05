package com.wine.xml;

import java.util.ArrayList;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("wineIng")
public class WineIng {

	private ArrayList<Wine> wineList = new ArrayList<Wine>();

	private ArrayList<WineSpecific> wineSpecifics;

	public ArrayList<Wine> getWineList() {
		return wineList;
	}

	public void setWineList(ArrayList<Wine> wineList) {
		this.wineList = wineList;
	}

	public void addToWineList(Wine wine) {
		this.wineList.add(wine);
	}

	public ArrayList<WineSpecific> getWineSpecifics() {
		return wineSpecifics;
	}

	public void setWineSpecifics(ArrayList<WineSpecific> wineSpecifics) {
		this.wineSpecifics = wineSpecifics;
	}

}
