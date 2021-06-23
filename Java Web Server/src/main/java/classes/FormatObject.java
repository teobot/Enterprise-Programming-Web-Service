package classes;

import java.util.ArrayList;

import interfaces.FormatInterface;
import models.Film;

public abstract class FormatObject implements FormatInterface {
	
	// This object is the parent object of the different formaters,
	// Each new format includes the following variables and methods.
	//
	// This class also implements a FormatInterface, this ensures that new formats include the needed methods,
	// for the url mapping functions to correctly operate.
	
	protected ArrayList<Film> films;
	protected String applicationHeader;
	protected String jspOutputPage;
	

	public ArrayList<Film> getFilmList() {
		return films;
	}
	
	public String getApplicationHeader() {
		return applicationHeader;
	}
	
	public String getJSPOutputPage() {
		return jspOutputPage;
	}

}
