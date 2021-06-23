package controllers;

import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import classes.FormatObject;
import factories.FormatFactory;
import models.Film;
import models.FilmDAO;
import models.Filmlist;

@Controller
@RequestMapping("/retrieve")
public class FilmSearchController {

	// This method returns all the films. Using the produces method, it returns
	// either JSON or XML, but the client must send the correct headers.
	@RequestMapping(value = "get-all-films", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, method = RequestMethod.GET)
	@ResponseBody
	public Filmlist getAllFilms() {
		ArrayList<Film> allFilms = FilmDAO.listFilms(15);
		Filmlist filmlist2 = new Filmlist();
		filmlist2.setFilmList(allFilms);
		return filmlist2;
	}

	// This method returns all the films, using the title given through the request
	// parameter
	@RequestMapping(value = "get-films-by-name", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, method = RequestMethod.GET)
	@ResponseBody
	public Filmlist getFilmsByName(@RequestParam("name") String name) {
		ArrayList<Film> allFilms = FilmDAO.retrieveFilm(name);
		Filmlist filmlist = new Filmlist();
		filmlist.setFilmList(allFilms);
		return filmlist;
	}

	// This function returns all the films and in the format given through the
	// parameter
	@RequestMapping(value = "get-all-films-format", method = RequestMethod.GET)
	public String getFilmsByFormat(
			@RequestParam(value = "format", required = false, defaultValue = "json") String format, Model responseModel,
			HttpServletResponse response) {
		// Get a format Object using the format factory based on the user input, then
		// return data in given format.
		FormatObject formattedFilmObject = FormatFactory.getInfoObject(format.toUpperCase(), FilmDAO.listFilms(25));
		responseModel.addAttribute("films", formattedFilmObject.getFormattedData());
		response.setContentType(formattedFilmObject.getApplicationHeader());
		return formattedFilmObject.getJSPOutputPage();
	}

	// This function finds films based on the URL Path and value given,
	// e.g /search-films/id?value=11325 will find films with the id and the value
	// 11325,
	// e.g /search-films/year?value=1990 will find films from the year 1990
	@RequestMapping(value = "search-films/{search}", method = RequestMethod.GET)
	public String getFilmsBySearch(
			@RequestParam(value = "format", required = false, defaultValue = "json") String format,
			@PathVariable(value = "search") String searchParameter,
			@RequestParam(value = "value", required = true, defaultValue = "null") String searchValue,
			Model responseModel, HttpServletResponse response) {
		if (searchParameter.equals("all") || searchValue.equals("null")) {
			// If the user goes to /search-films/all or they didn't give a search value
			// Then return all the films by default
			return getFilmsByFormat(format, responseModel, response);
		} else {
			// User has given a filter and value so check if the filter is available
			if (new Film().returnVariables().containsKey(searchParameter)) {
				// If the user filter is a variable in the film class then return films
				FormatObject formattedFilmObject = FormatFactory.getInfoObject(format.toUpperCase(),
						FilmDAO.getFilmsWhere(searchParameter, searchValue));
				responseModel.addAttribute("films", formattedFilmObject.getFormattedData());
				response.setContentType(formattedFilmObject.getApplicationHeader());
				return formattedFilmObject.getJSPOutputPage();
			}

			return getFilmsByFormat(format, responseModel, response);
		}
	}

	// This method returns the film by id through the given path parameter
	// e.g. /search/film/11345 will return the movie with the id of 11345
	@RequestMapping(value = "film/{filmId}", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	@ResponseBody
	public Film getFilmByFilmId(@PathVariable(value = "filmId") Integer filmId) {
		// Return the film object
		return FilmDAO.getFilmById(filmId);
	}

}
