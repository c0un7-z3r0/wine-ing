package com.wine.xml;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamImplicit;
import com.thoughtworks.xstream.io.xml.DomDriver;

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
	
	public void addToWineList(Wine wine){
		this.wineList.add(wine);
	}

	public ArrayList<WineSpecific> getWineSpecifics() {
		return wineSpecifics;
	}

	public void setWineSpecifics(ArrayList<WineSpecific> wineSpecifics) {
		this.wineSpecifics = wineSpecifics;
	}

	public String wineListToJson(){
		String json = "{\"wineList\": [";
		for(int i = 0; i < wineList.size(); i++){
			if(i == 0){
				json += wineList.get(i).wineToJson();
			}else{
				json += "," + wineList.get(i).wineToJson();
			}
			
		}
		json += "]}";
		return json;
	}
	
	
	
}
