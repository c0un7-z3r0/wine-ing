package com.wine.actions;

import java.io.File;

public interface Actions<T> {
	public T execute(File file, Object param) throws Exception;
}
