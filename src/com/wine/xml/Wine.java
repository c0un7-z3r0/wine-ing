package com.wine.xml;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

@XStreamAlias("wine")
public class Wine {

	@XStreamAlias("name")
	private String name;
	@XStreamAlias("art")
	private String art;
	@XStreamAlias("region")
	private String region;
	@XStreamAlias("winzer")
	private String winzer;
	@XStreamAlias("typ")
	private String typ;
	@XStreamAlias("preis")
	private String preis;
	@XStreamAlias("id")
	@XStreamAsAttribute
	private String id;

	public Wine() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the art
	 */
	public String getArt() {
		return art;
	}

	/**
	 * @param art
	 *            the art to set
	 */
	public void setArt(String art) {
		this.art = art;
	}

	/**
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}

	/**
	 * @param region
	 *            the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}

	/**
	 * @return the winzer
	 */
	public String getWinzer() {
		return winzer;
	}

	/**
	 * @param winzer
	 *            the winzer to set
	 */
	public void setWinzer(String winzer) {
		this.winzer = winzer;
	}

	/**
	 * @return the typ
	 */
	public String getTyp() {
		return typ;
	}

	/**
	 * @param typ
	 *            the typ to set
	 */
	public void setTyp(String typ) {
		this.typ = typ;
	}

	/**
	 * @return the preis
	 */
	public String getPreis() {
		return preis;
	}

	/**
	 * @param preis
	 *            the preis to set
	 */
	public void setPreis(String preis) {
		this.preis = preis;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

}
