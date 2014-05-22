package com.wine.xml;


import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;
import com.wine.helper.WineHelpers;

@XStreamAlias("wine")
public class Wine  {

	@XStreamAlias("name")
	private String name;
	@XStreamAlias("kind")
	private String kind;
	@XStreamAlias("region")
	private String region;
	@XStreamAlias("winemaker")
	private String winemaker;
	@XStreamAlias("type")
	private String type;
	@XStreamAlias("price")
	private double price;
	@XStreamAlias("id")
   	@XStreamAsAttribute
	private String id;
	
	
	public Wine(){

	}

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getWinemaker() {
		return winemaker;
	}

	public void setWinemaker(String winemaker) {
		this.winemaker = winemaker;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	public void setPrice(String str) {
		this.price = Double.parseDouble(str);
	}


	public String getId() {
		return id;
	}

	
	public void setId(String id) {
		this.id = id;
	}
	
	public Wine jsonToWine(String json){
		try {
			JSONObject jsonObj = (JSONObject) new JSONParser().parse(json);
			this.id = WineHelpers.generateId();
			this.name = (String) jsonObj.get("name");
			this.kind = (String) jsonObj.get("kind");
			this.region = (String) jsonObj.get("region");
			this.winemaker = (String) jsonObj.get("winemaker");
			this.type = (String) jsonObj.get("type");
//			this.price =  jsonObj.get("price");
			this.price = Double.parseDouble((String) jsonObj.get("price"));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		
		
		return null;
	}
	
	public String wineToJson(){
		String json =	"{"+
						"\"id\":\""+this.id+"\","+
						"\"name\":\""+this.name+"\","+
						"\"kind\":\""+this.kind+"\","+
						"\"region\":\""+this.region+"\","+
						"\"winemaker\":\""+this.winemaker+"\","+
						"\"type\":\""+this.type+"\","+
						"\"price\":\""+this.price+"\"" +
						"}";
		return json;
	}
	
	
	
}
