package formats;

import java.util.ArrayList;

import com.google.gson.Gson;

import classes.FormatObject;
import models.Film;
import models.Filmlist;

public class FormatJSON extends FormatObject {
	
	// This is the JSON Format object, It returns the given filmlist in JSON format.

	public FormatJSON(ArrayList<Film> films) {
		// TODO Auto-generated constructor stub
		this.films = films;
		this.applicationHeader = "application/json";
		this.jspOutputPage = "film-json";
	}
	
	@Override
	public String getFormattedData() {
		Gson gson = new Gson();
		Filmlist fl = new Filmlist();
		fl.setFilmList(films);
		return gson.toJson(fl);
	}
}
