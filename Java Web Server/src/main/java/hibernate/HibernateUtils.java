package hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import models.Film;

public class HibernateUtils {

	// This is the hibernate utils class, its a singleton to avoid creating
	// duplicate database connections

	private static SessionFactory factory;
	private static HibernateUtils hibUtils;

	public SessionFactory getSessionFactory() {
		if (factory == null) {
			factory = buildSessionFactory();
		}
		return factory;
	}

	private SessionFactory buildSessionFactory() {
		if (factory == null) {
			factory = new AnnotationConfiguration().configure().addAnnotatedClass(Film.class).buildSessionFactory();
		}
		return factory;
	}

	public static HibernateUtils getHibernateDatabase() {
		if (hibUtils == null) {
			hibUtils = new HibernateUtils();
		}
		return hibUtils;
	}

	private HibernateUtils() {
		// Optional constructor code here
	}

}
