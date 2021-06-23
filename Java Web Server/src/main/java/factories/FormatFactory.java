package factories;

import java.util.ArrayList;

import classes.FormatObject;
import formats.FormatJSON;
import formats.FormatTEXT;
import formats.FormatXML;
import models.Film;

public class FormatFactory {
	
	// This is a factory, it decides which format to return.
	// The current options are XML, JSON and TEXT, with the default being JSON.
	
	// It returns a FormatObject, that contains the formatted data and application headers
	
	public static synchronized FormatObject getInfoObject(String input, ArrayList<Film> films) {
		if(input.equals("XML")) {
			return new FormatXML(films);
		} else if (input.equals("TEXT")) {
			return new FormatTEXT(films);
		} else {
			return new FormatJSON(films);
		}
	}

}
