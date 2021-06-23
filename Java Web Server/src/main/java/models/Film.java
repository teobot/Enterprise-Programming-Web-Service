package models;

import javax.xml.bind.annotation.XmlRootElement;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "films")
@XmlRootElement(name = "film")
public class Film {

	// This is the Film object,
	//
	// Its mapped using javax for hibernate to map to the database, its also mapped
	// in xml so that
	// it can be returned in xml.
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;

	@Column(name = "title")
	private String title;

	@Column(name = "year")
	private Integer year;

	@Column(name = "director")
	private String director;

	@Column(name = "stars")
	private String stars;

	@Column(name = "review")
	private String review;

	@Column(name = "rating")
	private Integer rating;

	public Film(Integer id, String title, Integer year, String director, String stars, String review, Integer rating) {
		super();
		this.id = id;
		this.title = title;
		this.year = year;
		this.director = director;
		this.stars = stars;
		this.review = review;
		this.rating = rating;
	}

	public Film() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		if (id != null) {
			this.id = id;
		}
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		if (!title.trim().equals("") || title != null) {
			this.title = title;
		}
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		if (year != null) {
			this.year = year;
		}
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		if (!director.trim().equals("") || director != null) {
			this.director = director;
		}
	}

	public String getStars() {
		return stars;
	}

	public void setStars(String stars) {
		if (!stars.trim().equals("") || stars != null) {
			this.stars = stars;
		}
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		if (!review.trim().equals("") || review != null) {
			this.review = review;
		}
	}
	
	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		if (rating != null) {
			this.rating = rating;
		}
	}

	@Override
	public String toString() {
		return "Film [id=" + id + ", title=" + title + ", year=" + year + ", director=" + director + ", stars=" + stars
				+ ", review=" + review + ", rating=" + rating + "]";
	}

	public Map<String, Object> returnVariables() {
		Map<String, Object> variables = new LinkedHashMap<String, Object>();
		variables.put("id", id);
		variables.put("title", title);
		variables.put("year", year);
		variables.put("director", director);
		variables.put("stars", stars);
		variables.put("review", review);
		variables.put("rating", rating);
		return variables;
	}
}
