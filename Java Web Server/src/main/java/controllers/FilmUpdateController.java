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
public class FilmUpdateController {

	// This method updates the given film with the new information
	@RequestMapping(value = "update-film", method = RequestMethod.PUT)
	@Consumes({ "application/json", "application/xml" })
	@ResponseBody
	public Film updateFilm(@RequestBody Film f, HttpServletResponse response) {
		// Return true of false if the update method was succesful on updating the film
		if (FilmDAO.updateFilm(f)) {
			response.setStatus(HttpServletResponse.SC_OK);
			return f;
		} else {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

	}

	// This method uses the simple http method to update a film
	@RequestMapping(value = "update-film-simpleHttp", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, method = RequestMethod.POST)
	@ResponseBody
	public Film updateMovieSimpleHTTP(@RequestParam(value = "id", required = true) Integer id,
			@RequestParam(value = "title", required = false) String title,
			@RequestParam(value = "year", required = false) Integer year,
			@RequestParam(value = "director", required = false) String director,
			@RequestParam(value = "stars", required = false) String stars,
			@RequestParam(value = "review", required = false) String review,
			@RequestParam(value = "rating", required = false) Integer rating, HttpServletResponse response) {
		Film filmToUpdate = new Film(id, title, year, director, stars, review, rating);
		return updateFilm(filmToUpdate, response);
	}

}
