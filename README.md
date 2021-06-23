# Enterprise-Programming-Web-Service

## Project Information
*Github Link*: [Link to project](https://github.com/teobot/Enterprise-Programming-Web-Service)  
*Full Project Walkthrough* [YouTube Link](https://youtu.be/6IpeEYqHgbI)  
*Unit title*: **Enterprise Programming**  
*Project Language*: **Java**  
*Assignment set by*: **N. Whittaker**  
*Assignment title*: **Developing, deploying, publishing and finding your own web service**  
*Assessment weighting*: **100%**  
*Assessment Grade*: **🌟100%🌟**   
*Type*: **Individual**  

## Table of Contents
- [Enterprise-Programming-Web-Service](#enterprise-programming-web-service)
  - [Project Information](#project-information)
  - [Table of Contents](#table-of-contents)
  - [Project Outline](#project-outline)
    - [Project Architecture](#project-architecture)
  - [Project Evaluation](#project-evaluation)
    - [Introduction](#introduction)
    - [Design patterns and techniques used](#design-patterns-and-techniques-used)
      - [MVC software design pattern](#mvc-software-design-pattern)
      - [Factories](#factories)
      - [Interfaces](#interfaces)
      - [DAO (Data Access Objects)](#dao-data-access-objects)
      - [Singleton](#singleton)
      - [Spring MVC](#spring-mvc)
      - [Hibernate Database](#hibernate-database)
      - [WSDL](#wsdl)
      - [GSON](#gson)
      - [JAXB](#jaxb)
      - [Google App Engine](#google-app-engine)
      - [Google Cloud Database](#google-cloud-database)
      - [React](#react)
      - [Coding Techniques](#coding-techniques)
        - [Comments](#comments)
        - [File and Folder Structure](#file-and-folder-structure)
        - [Naming conventions](#naming-conventions)
    - [Commentary on SOAP, REST and HTTP](#commentary-on-soap-rest-and-http)

## Project Outline
The Project consists of two distinct applications:
1. Java Web Service API
   - Written in Java
   - Deployed and developed using the Google App Engine Platform
   - Uses the SpringMVC framework
   - Uses Hibernate for database connections and mapping
   - Google Cloud Database for persistent storage
   - Uses SpringMVC produces annotation, JAXB and JSON libraries
     - Returns and accepts data in the following formats
       - XML
       - TEXT
       - JSON (Default)
   - Singleton Database Connection
   - Using DAO for data interaction
   - Includes WSDL interface for legacy systems
2. React Web Client
   - Written in Javascript using the React Framework
   - Tracked and developed using Github
     - [Link to project](https://github.com/teobot/enterprise-client)

### Project Architecture
![Project Map](https://github.com/teobot/Enterprise-Programming-Web-Service/blob/main/assets/enterpriseProjectLayout.png?raw=true)


## Project Evaluation

### Introduction
In this evaluation I will be discussing techniques I have used within my project; I will be evaluating 
the pros and cons of each approach and the design/implementation decisions taken. I will be 
showing where in the project these design patterns were used and why I used them. I will also be 
showing and talking about the different frameworks used throughout as well as a commentary on 
the different APIs (SOAP, REST, HTTP).
### Design patterns and techniques used

#### MVC software design pattern
MVC or Model-View-Controller is a design pattern where the application is separated into three 
sections. The Model controls the data logic of the application, the view controls the UI logic and the 
controller which acts as the brain ties the data to the UI.

In my application, the controllers decide the logic of incoming requests and data, as well as the 
format of data being returned to the client. In the FilmSearchController which handles the searching 
of films. Once the user requests the film data, the controller generates the film information from the 
FilmDAO model. It then is formatted in the requested format and sent to a View (JSP page).

The reason I decided to use the MVC design pattern was due to a number of reasons. Firstly, it
helped me separate my code, each controller had a clear function and it was easy to manage. 
Secondly, it allowed me to develop the project faster, I could re-use code and integrate new formats
without copying the same code. Lastly, as MVC is a widely use design pattern, new programmers or 
development teams, even if they don’t understand the programming language will likely understand 
the design pattern and therefore will be able to grasp the general architecture. Overall, for my 
project it provided great structuring and code readability, it also helped with bug fixing as If I had 
specific problems, I could easily trace the code from the controller.
#### Factories
A factory is a method that creates objects without the user needing to know the exact names of the 
objects themselves. This makes creating new objects easier to developers working on a project.

In my application, the controllers can create a FormatObject using the FormatFactory. Each of the 
different format’s classes format the data to the desired type (JSON, XML, TEXT) and return this to 
the client. This means that for each controller I can write generic, non-specific code that will work on 
every format that has been created.

The reason I used a Factory, was that the brief required that the data to be returned in either JSON, 
XML or STRUCTURED TEXT. Having a factory, allowed me to create the different formats required 
without changing any of the code in the controllers. I could then create a new format by extending it 
to the FormatObject class and overriding the getGeneratedData method with the creation of the 
formatted filmlist. Using a factory means that future developers do not need to learn all the 
separate class names for the different formats. It also means that in the future creating different 
formats, requires only creating the new format object and adding it to the factory object. Lastly, by 
having the return data controlled by the factory, I can set the default format if the user provides an
invalid format.

#### Interfaces
An interface is an abstract type that is used to specify how another class behaves.

In my application, The FormatObject in which all formats extend, implements the FormatInterface. 
This allows me to control the behavior of all new formats. In this case I use the interface to enforce 
that all new formats include the method “getFormattedData”. Without this method the controllers
would cause an error and halt the program unexpectedly. This could be difficult to trace if the 
developer doesn’t have a clear understand of the system. 

#### DAO (Data Access Objects)
A DAO or data access object is an object that provides access to a database or a type of persistent 
storage.

In my application the FilmDAO, using the HibernateUtils completes all CRUD operations. It can 
receive, Insert, update and delete films in the database. It acts an interface for the controllers to 
access information in the database. 

I used this within the project as it allowed me to provide a method for the controllers to access the 
Film object information, this then allowed me to use a shared database connection and remove the 
need for each controller to use duplicate code to receive the data. Secondly, it acted as a single point 
for film information, this means that when adding new functions, they can be grouped in a single 
location, this makes bug fixing easier to track down.

Thirdly, by separating the database connection side and the data access side, it makes the code 
much more readable. For all these reasons it means that for future development it removes the 
problem of adding new functions to receive data.

#### Singleton
The singleton design pattern is where a class restricts the number of initializations to just a single 
instance.

In my application the HibernateUtils class, controls the connection to the database using hibernate.
I decide to use the singleton design pattern here to reduce the number of connections to the 
database, as this can be costly on both system resources and performance. 

This specific implementation of the singleton pattern is referred to as the “Lazy” Initialization. This is 
because neither the class nor the factory are created until the method is called. Other methods such 
as the “eager” method, initializes the instance before the variable is being used but this can lead to 
resources being used with no use at the program’s current runtime. 

This is why I used the “lazy” implementation as I believe in this case that the database connection 
doesn’t need to be created before being used and left to sit idly as this can use up system resources. 
In my implementation the connection is only initialized when needed. However, the disadvantage to 
this method is that the initial initialization can take longer than expected, causing a prolonged initial 
wait time. But I believe the initial wait time is worth the unused idling system resources. 

#### Spring MVC
Spring Web MVC is a framework that provides the MVC architecture along with custom methods for 
mapping web requests.

In my project, spring helped greatly when creating the different controllers and dealing with the 
different formats from the client. 

Using spring made it super easy to convert the incoming XML and JSON formatted request bodies to 
Film objects, using the “@Consumes” and “@RequestBody” annotations. It also allowed me to easily 
implement all CRUD operations through “@RequestMapping” annotation. 
As I mentioned before spring was able to convert request body data to either JSON or XML 
automatically, without this I would have had to create separate methods to decode these strings to 
objects. 

Spring also can return the film Objects in either JSON or XML automatically depending on what 
“Accept” header the client sends. This allowed me to quickly implement the feature of returning the 
data back in two different formats. Without this I would have to implement more code, checking 
what header has been sent, then format the data accordingly, but spring handles it all for me.

(I created two methods for getting all films to the client, one uses the spring web mvc produces 
annotation and the other uses a URL parameter, FormatObjects, Factories and JSP pages to display 
the data)

#### Hibernate Database
Hibernate is a mapping framework for objects, it also provides mapping models to a relational 
database.

In my project I use hibernate to map the google cloud relational MySQL database to the film objects. 
This means that when I return film data from the database, hibernate automatically converts these 
to film objects that I can interact with. Hibernate also provides additional methods for interacting 
with the database. This was a major benefit as this completely removed the need for me to create 
several functions mapping the returned strings to each object. This both saved me time when 
developing but also means that it’s easier to read for myself and future developers. 

Hibernate also offered a method called “setParameter” which when applied to a SQL query, injected 
values into the string using placeholders. This made the query safe from SQL injection attacks at no 
additional code or setup. This provides all my queries with extra security and defends my database
against attacks. This saved a lot of development time and allowed me to prototype much quicker. 

Using hibernate provided me with greater code readability and integrity with little costs. However, 
using a third-party package mean that extra time and effort must be taken when upgrading, as this 
can create vulnerabilities within the system. It also means that it’s another package that future 
develops must use and understand to expand the system. Thankfully, hibernate is well adapted in 
the industry.

#### WSDL
WSDL stands for Web Services Descriptive Language and describes the ways you can interact with 
the given web service.

I used the eclipse web services generator to generate the WSDL files for all controllers and the DAO, 
I also generated the soap interface using the generator in eclipse. Having this WSDL file means that 
users can view the interactions with the web service, it will allow future developers to both see how 
they can use the web service and provide a means of accessing the service. This will also allow legacy 
systems to interact with the newest version of the service.

#### GSON
GSON is a java library that helps in converting java objects to JSON.

In my project I use the GSON library to help me convert my films and filmlist objects to a json string 
for the client. This library provided a method of generating json easily and quickly, while still being 
readable for the developer. This also meant that I didn’t have to write the functions and methods 
myself. The library is also built for performance and scalability, meaning that as the service scales up 
the generating of the json formatted will not use up additonal system resources.

#### JAXB
JAXB is a library used for manipulating XML.

In my project I use the JAXB library to convert the Film and array of Films to XML for the client. I had 
to map both the Film and Filmlist using the JAXB XML annotations. The Filmlist provided a root 
element for the Films. 

With java, working with XML was difficult but using this library, it meant that I could format entire 
lists of films or single objects with ease and without needing to adapt more than a few lines of code.

The creation of the XML in the Formatter was tricky and can be confusing which is why I added the 
comments throughout the process to inform any new developers.

There are other alternatives to the JAXB library, such as JAXP, WoodStox or xStream. But JAXB 
provides simplicity, while it may not be the fastest it meets the needs of the current project and 
gives room for expandability. If the web service becomes much greater, developers can replace the 
current JAXB with ease as it doesn’t leave a large footprint and all uses are commented. 

#### Google App Engine
Google App Engine (GAE) is a platform for cloud computing, for developing and hosting web 
applications.

For my project I used Google App Engine to both create my java web service and then host at 
https://enterpriseproject18055445.appspot.com/. Creating the application using the eclipse Google 
Cloud extension was made really easy, Within the first few minutes I had a Google App project 
working and I could start development. The initial hosting of the application was difficult, Google 
Cloud requires a certain JRE whereas the default is a JDK, Once I had swapped, I had to then 
configure the application on the Google console. This was relatively straight forward to follow since 
Google have developed a well-made tutorial. Once the project had been created, I could then push 
the local project to the cloud. This is really easy and quick. It means any new development can be 
deployed to the users rapidly.

Using the google dashboard you can then track almost every part of the web service. This provides 
greater insight into the workings of the website then other competitors such as Microsoft azure.

Google App engine also provides rapid scalability, it means that VM instances are removed and 
created if the demand grows. Compare this to a static java dynamic web service, once you find 
suitable hosting, most providers then restrict you to specific system resources and don’t allow for 
autoscaling. 

Google cloud also has automatic protection for DDOS attacks. Google is also well known for its 
constant availability. Overall, Google cloud allowed me to prototype quickly using the template. It 
provides great support and VM capability which standard web hosting can’t offer.

#### Google Cloud Database
Google cloud database is a service that provides persistent database storage.

In my project, I use a Google Cloud MYSQL database for the persistent storage. This database then 
contains the Film information and using the HibernateUtils it is then accessed and sent to the client. 
Creating a database using the Google platform was quick and easy. It’s fast and responsive and 
offers automated backups. Since the database is also using autoscaling, If the project gets expanded 
the database VM will scale and provided a consistent and strong connection. Google also offers auto 
storage, this scales the VMs storage if more data is added. 

Alternatives to using a google cloud database is Amazon Simple Storage. Amazon Storage offers 
more region availability then Google does, It also provides better customer support. However, 
Google offers cheaper pricing and faster speeds to the database. The project is also being hosted via 
Google Cloud which for future developers makes it much easier to manage since all aspects of the 
service are located and grouped together.

#### React
React is a JavaScript library, primarily used to rapidly create web clients.

In my project, I created the front-end web client in react. I then built the project and hosted it via 
GitHub pages. React allowed me to rapidly prototype a working client, while using an MVC based 
architecture to improve scalability and readability. I used Semantic React UI for the formatting and 
styling, I also used jQuery for the Ajax calls. I created a FormatFactory to decode the incoming 
information from the Google App backend.

To handle the Ajax requests, I created a urlHelper, this created the requests, setting the request 
headers, type and data. The requestFactory, which created the Ajax request was an asynchronous 
method. This meant that I could implement loading bars and spinners which wait until the request 
has been made. This also meant that for all requests being made, they pass through this class. So,
changing from the development build to the live version was made much easier as only the base URL 
in a single class had to be changed. 

I decide to use React library over native JavaScript as this allowed me to rapidly develop new 
components to the website as React is based on creating re-usable components. Using React also 
offers a huge performance boost over native JavaScript as all possible code is compacted and 
compressed to offer faster and smaller functions. React also has simple architecture and developers 
that have worked on MVC type systems previously will be able to understand the component-based
architecture.

#### Coding Techniques
Coding techniques are the common practices that programmers use when developing. 

In my projects I used many coding techniques such as;

##### Comments
I used comments to describe difficult to understand or follow sections of code. I did this because it 
both helped me when coming back to the function to understand what is happening and it will help 
new developers when they need to expand or alter parts of the system.

##### File and Folder Structure
In my project I grouped classes and objects that completed a similar function. For instance, in my 
controllers each CRUD operation gets its own controller, and then similar or grouped methods are 
placed inside. For example, the FilmSearchController handles all searching methods, this includes 
getting all films, search by name and retrieving by id. This makes it easy for new or existing 
developers to find bugs or issues and provides a strong and simple file structure. Compare this to 
separating each method for the controllers, as this would quickly cause issues when expanding 
functionality

##### Naming conventions
Naming conventions are the practice of naming files, classes and methods with a project. In my 
project I followed a simple and easy naming convention on my files. All words within a file name 
must start with a capital letter. This makes all files easy to read and the different words within a 
filename stand out and are clearly interpreted. Along with this all functions and methods must start 
with a lower-case character with all other words starting with a capital. This helps enforce which 
sections are methods and which are constructor or class names. I believe this will help future 
developers see clearly which files and functions are being identified.

### Commentary on SOAP, REST and HTTP
SOAP: stands for Simple Object Access Protocol and is an XML based messaging protocol.

REST: stands for Representational State Transfer and is a software architectural style for enforcing
standards for computer to computer interactions.

HTTP: stands for Hypertext Transfer Protocol and is the protocol in place for receiving hypermedia 
documents. 
SOAP and REST share some similarities, but SOAP is a more rigid set of rules when it comes to 
transmitting data. REST is more flexible in its formatting. In my project the SOAP calls are 
automatically understood, thanks to the spring framework. I can parse incoming XML data by using 
the “@Consumes” method. This allowed me to be more flexible when sending data to the web 
service. Since SOAP is much more rigid then REST it provides a built-in error catching, this is good for 
enforcing that data integrity is whole when transferring data.

It’s important that my web service offers both forms of system interaction. As this provides the 
greatest range of systems that can interact and use the web service. Since REST is newer than SOAP 
it means that a majority will be using the REST interaction, but many legacy systems still use SOAP so 
its important to provide the interaction capability.