package com.wine;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface Actions {
	 public String execute(HttpServletRequest request, HttpServletResponse response) throws Exception;
}
