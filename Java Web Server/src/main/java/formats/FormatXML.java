package formats;

import java.io.StringWriter;
import java.util.ArrayList;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import classes.FormatObject;
import models.Film;
import models.Filmlist;

public class FormatXML extends FormatObject {
	
	// This is the XML Format object, It returns the given filmlist in XML format.

	public FormatXML(ArrayList<Film> films) {
		// TODO Auto-generated constructor stub
		this.films = films;
		this.applicationHeader = "application/xml";
		this.jspOutputPage = "film-xml";
	}

	@Override
	public String getFormattedData() {
		// This function takes a Filmlist, converts it to XML and then returns it as a string
		try {
			JAXBContext context = JAXBContext.newInstance(Filmlist.class);
			Marshaller m = context.createMarshaller();
			m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			// convert the XML to a string to be sent to the JSP page
			Filmlist filmlistTEMP = new Filmlist();
			filmlistTEMP.setFilmList(films);
			StringWriter sw = new StringWriter();
			m.marshal(filmlistTEMP, sw);
			String XMLtoString = sw.toString();
			return XMLtoString;
		} catch (JAXBException e) {
			//  Auto-generated catch block
			e.printStackTrace();
		}

		return "";
	}

}
