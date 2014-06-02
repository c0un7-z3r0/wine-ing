package com.wine.xml;


import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

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
	private String price;
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

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getId() {
		return id;
	}

	
	public void setId(String id) {
		this.id = id;
	}
	
	

		
		
		
	
	
	
}
