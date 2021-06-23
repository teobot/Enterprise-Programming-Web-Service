package controllers;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import models.Film;
import models.FilmDAO;

@Controller
public class FilmDeleteController {

	// This method deletes the film based on the given XML film object
	@RequestMapping(value = "delete-film", produces = { MediaType.APPLICATION_JSON,
			MediaType.APPLICATION_XML }, method = RequestMethod.DELETE)
	@Consumes({ "application/json", "application/xml" })
	@ResponseBody
	public Film deleteFilm(@RequestBody Film f, HttpServletResponse response) {
		// Returns true or false if the delete was successful
		if (FilmDAO.deleteFilm(f) && f.getId() != null) {
			response.setStatus(HttpServletResponse.SC_OK);
			return f;
		} else {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

	}

	// This method deletes the given movie id from the database,
	// e.g. /delete-film-by-id?id=11348 would delete movie with id 11348
	@RequestMapping(value = "delete-film-by-id", method = RequestMethod.GET)
	@ResponseBody
	public String deleteFilmById(@RequestParam(value = "id", required = true) Integer id,
			HttpServletResponse response) {
		// Returns true or false if the delete was successful

		if (FilmDAO.deleteFilmById(id) && id != null) {
			response.setStatus(HttpServletResponse.SC_OK);
			return Integer.toString(id);
		} else {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}

	}

}
