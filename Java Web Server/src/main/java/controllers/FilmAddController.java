package controllers;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import models.Film;
import models.FilmDAO;

@Controller
public class FilmAddController {

	// This method accepts a new film object in either JSON or XML format. It then
	// inserts or updates this into the database.
	@RequestMapping(value = "add-film", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, method = RequestMethod.POST)
	@Consumes({ "application/json", "application/xml" })
	@ResponseBody
	public Film addMovie(@RequestBody Film f, HttpServletResponse response) {
		// Returns true of false if the saveOrUpdate method was succesful
		if (FilmDAO.saveOrUpdateFilm(f)) {
			response.setStatus(HttpServletResponse.SC_OK);
			return f;
		} else {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
	}

	// This method uses the simple http method of adding a new film
	@RequestMapping(value = "add-film-simpleHttp", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, method = RequestMethod.POST)
	@ResponseBody
	public Film addMovieSimpleHTTP(@RequestParam(value = "title", required = true) String title,
			@RequestParam(value = "year", required = true) Integer year,
			@RequestParam(value = "director", required = true) String director,
			@RequestParam(value = "stars", required = true) String stars,
			@RequestParam(value = "review", required = true) String review,
			@RequestParam(value = "rating", required = true) Integer rating, HttpServletResponse response) {
		Film filmToAdd = new Film(null, title, year, director, stars, review, rating);
		return addMovie(filmToAdd, response);
	}
}
