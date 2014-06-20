package com.wine.xml;

import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

@XStreamAlias("wineOrder")
public class WineOrder {

	@XStreamAsAttribute
	private String orderNumber;
	@XStreamAlias("orderJson")
	private String orderJson;

	/**
	 * @return the orderNumber
	 */
	public String getOrderNumber() {
		return orderNumber;
	}

	/**
	 * @param orderNumber
	 *            the orderNumber to set
	 */
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}

	/**
	 * @return the orderJson
	 */
	public String getOrderJson() {
		return orderJson;
	}

	/**
	 * @param orderJson
	 *            the orderJson to set
	 */
	public void setOrderJson(String orderJson) {
		this.orderJson = orderJson;
	}

}
