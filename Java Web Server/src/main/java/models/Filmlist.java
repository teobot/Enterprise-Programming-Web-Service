package models;
import java.util.ArrayList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace = "xml.jaxb.model")
public class Filmlist {
    // XmLElementWrapper generates a wrapper element around XML representation
    @XmlElementWrapper(name = "filmlist")
    // XmlElement sets the name of the entities
    @XmlElement(name = "film")
    
    private ArrayList<Film> filmList;
    
	public void setFilmList(ArrayList<Film> filmList) {
        this.filmList = filmList;
    }

    public ArrayList<Film> getFilmsList() {
        return filmList;
    }
    

}