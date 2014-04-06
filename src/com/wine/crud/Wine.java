package com.wine.crud;

import java.io.Serializable;

public class Wine implements Serializable {

	private String name;
	private String kind;
	private String region;
	private String winemaker;
	private String type;
	private double price;
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
	
}
