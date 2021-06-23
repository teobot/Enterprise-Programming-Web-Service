package models;

import java.util.ArrayList;
import java.util.Map.Entry;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import hibernate.HibernateUtils;

@SuppressWarnings("unchecked")
public class FilmDAO {
	// This is the Film data access object,
	// This is where the film classes access the database

	// This method accepts a integer for the limit of films to return back
	public static ArrayList<Film> listFilms(Integer limit) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		ArrayList<Film> films = null;
		try {
			tx = session.beginTransaction();
			films = (ArrayList<Film>) session.createQuery("FROM Film").setMaxResults(limit).list();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return films;
	}

	// This method accepts a film object.
	// If the film exists in the database then update, else insert it.
	public static Boolean saveOrUpdateFilm(Film f) {
		Boolean methodSuccess = false;
		Boolean missingValues = false;
		for (Entry<String, Object> entry : f.returnVariables().entrySet()) {
			if ((entry.getValue() == null) && !entry.getKey().equals("id")) {
				missingValues = true;
			}

		}
		if (missingValues) {
			return false;
		}
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.saveOrUpdate(f);
			tx.commit();
			methodSuccess = true;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return methodSuccess;
	}

	// This method accepts a Film object and deletes the film from the database
	public static Boolean deleteFilm(Film f) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		Boolean methodSuccess = false;
		try {
			tx = session.beginTransaction();
			session.delete(f);
			tx.commit();
			methodSuccess = true;
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return methodSuccess;
	}

	// This method accepts a title of a tile and returns films with the given title
	public static ArrayList<Film> retrieveFilm(String name) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		ArrayList<Film> films = null;

		try {
			tx = session.beginTransaction();
			films = (ArrayList<Film>) session.createQuery("FROM Film WHERE title LIKE :title")
					.setParameter("title", "%" + name + "%").list();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return films;
	}

	// This method accepts a SQLClause for the query along with variable names and
	// variable value
	// It then executes the SQLClause and passes the given variable and values
	public static ArrayList<Film> getFilmsWhere(String variableName, Object variable) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		ArrayList<Film> films = null;
		Boolean isNumber = false;
		try {
			variable = Integer.parseInt((String) variable);
			isNumber = true;
		} catch (NumberFormatException e) {

		}
		try {
			tx = session.beginTransaction();
			
			films = (ArrayList<Film>) session.createQuery("FROM Film WHERE " + variableName + (isNumber ? " = "  : " LIKE ") + ":" + variableName)
					.setParameter(variableName, isNumber ? variable : "%" + variable + "%").list();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return films;
	}

	// This method accepts a Film id then deletes the film with the same id in the
	// database
	public static Boolean deleteFilmById(Integer id) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		try {
			tx = session.beginTransaction();
			session.createQuery("DELETE FROM Film WHERE id = :id").setParameter("id", id).executeUpdate();
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		System.out.println(id + ": deleted");
		return getFilmById(id) == null;
	}

	// This method updates the film based on the new values provided
	// It returns true if the update was successful or false if no update
	public static Boolean updateFilm(Film f) {
		Film getOrignalFilm = FilmDAO.getFilmById(f.getId());
		Boolean methodSuccess = false;

		if (getOrignalFilm != null) {
			// If the given film exists within the database
			HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
			Session session = hibUtils.getSessionFactory().openSession();
			Transaction tx = null;
			String queryString = "UPDATE Film set ";

			// This checks which values have been given to be updated,
			// If the value is null then it doesn't get updated
			for (Entry<String, Object> entry : f.returnVariables().entrySet()) {
				if (entry.getValue() != null && !entry.getKey().equals("id")) {
					queryString += entry.getKey() + "=:" + entry.getKey() + ", ";
				}
			}

			// This removes the trailing comma at the SQL statement
			queryString += "WHERE id=:id";
			queryString = queryString.replace(", WHERE", " WHERE");
			try {
				tx = session.beginTransaction();
				Query query = session.createQuery(queryString);

				// Here I am setting the parameters for the query, The SQL statements includes
				// placeholders, This sets those placeholders with the values needed for the
				// update.
				for (Entry<String, Object> entry : f.returnVariables().entrySet()) {
					if (entry.getValue() != null && !entry.getKey().equals("id")) {
						query.setParameter(entry.getKey(), entry.getValue());
					}
				}
				query.setParameter("id", f.getId()).executeUpdate();
				tx.commit();
				methodSuccess = true;
			} catch (HibernateException e) {
				if (tx != null)
					tx.rollback();
				e.printStackTrace();
				methodSuccess = false;
			} finally {
				session.close();
			}
		}
		return methodSuccess;
	}

	// This method gets a film based on the given id
	public static Film getFilmById(Integer filmId) {
		HibernateUtils hibUtils = HibernateUtils.getHibernateDatabase();
		Session session = hibUtils.getSessionFactory().openSession();
		Transaction tx = null;
		Film film = new Film();
		try {
			tx = session.beginTransaction();
			film = (Film) session.get(Film.class, filmId);
			tx.commit();
		} catch (HibernateException e) {
			if (tx != null)
				tx.rollback();
			e.printStackTrace();
		} finally {
			session.close();
		}
		return film;
	}
}
