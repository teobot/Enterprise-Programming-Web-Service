package formats;

import java.util.ArrayList;
import java.util.Map.Entry;

import classes.FormatObject;
import models.Film;
import models.Filmlist;

public class FormatTEXT extends FormatObject {

	// This is the TEXT Format object, It returns the given filmlist in TEXT format.
	
	private String saltSeperator = "[@#@]";

	public FormatTEXT(ArrayList<Film> films) {
		// TODO Auto-generated constructor stub
		this.films = films;
		this.applicationHeader = "text/plain";
		this.jspOutputPage = "film-text";
	}

	@Override
	public String getFormattedData() {
		// This function takes a filmList and returns a structured Text string to the JSP page as a string
		String structuredTextString = "";	
		for (Entry<String, Object> entry : new Film().returnVariables().entrySet()) {
			structuredTextString += entry.getKey() + saltSeperator;
		}
		
		structuredTextString += "\n";
		Filmlist fl = new Filmlist();
		fl.setFilmList(films);
		for (Film film : fl.getFilmsList()) {
			for (Entry<String, Object> entry : film.returnVariables().entrySet()) {
				structuredTextString += entry.getValue() + saltSeperator;
			}
			structuredTextString += "\n";
		}
		
		return structuredTextString;
	}

}
