package com.wine.actions;

public interface Actions<T> {
	public T execute(Object param) throws Exception;
}
