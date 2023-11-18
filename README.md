**Welcome to _JavaScript Programming for Planners & Designers_!**

# Syllabus

* **Course**: CPLN-6920/MUSA-6110, University of Pennsylvania
* **Location**: Meyerson Hall B2 and online
* **Schedule**: 1:45-4:45PM, Wednesdays
* **Instructor**:
  * Mjumbe Poe, mjumbe@design.upenn.edu
* **TA**:
  * Sofia Fasullo, sfasullo@design.upenn.edu
* **Office Hours**:
  * Mjumbe:
    - Monday 1PM-5PM online
    - Wednesday 10AM-1PM on campus
    - Thursday 10AM-1PM online
    - [Book a time on Canvas](https://canvas.upenn.edu/calendar)
  * Sofia:
    - TBD
* **Need help?**
  * [Canvas](https://canvas.upenn.edu/courses/1744245)
  * Stack Overflow is your friend!


## Course Overview

Dashboards, maps, and other interfaces that enable the display, analysis, and in some cases generation new geospatial data, are often the _end product_ of a data analysis or modeling process. In this course we'll focus on the _interface_ and _interaction_ aspects of creating these products. You learn to design and build interfaces to help **users** access the value promised by geospatial data, modeling, and analysis.

As this is a JavaScript course, we'll be doing _a lot_ of programming in JavaScript. Because of the nature of interactive interfaces with JavaScript, we'll also be doing a lot of work with HTML and CSS.

This course is the first part of a track in MUSA in which you will learn to build data products. In the second course (_Geospatial Cloud Computing & Visualization_) we'll focus on the _data pipeline_ aspects of building these products. The courses are best together, but they can each also stand alone.

## Objectives

- Have familiarity and comfort with the JavaScript language (and, as necessary, HTML and CSS)
- Have familiarity with "tools of the trade", such as code editors, git and GitHub, and practices such as testing and linting code
- Understand the structure of client-side web applications built in JavaScript, especially:
  - How web browsers load resources from the web
  - How web browsers respond to user interaction
- Know how to use mapping libraries like [Leaflet](https://leafletjs.com/index.html), along with some of its various plugins
- Know how to use data visualization libraries like [D3](https://d3js.org/) or [ApexCharts](https://apexcharts.com/)
- Know how to use data analysis libraries like [Turf](https://turfjs.org/)
- Know how to use JavaScript in the browser to access and manipulate data in a variety of formats, particularly [GeoJSON](https://geojson.org/), [CSV](https://en.wikipedia.org/wiki/Comma-separated_values), and [Mapbox Vector Tiles](https://docs.mapbox.com/vector-tiles/reference/)
- Know how to use JavaScript in the browser to access web services and APIs, such as [Mapbox](hhttps://docs.mapbox.com/api/maps/) and [Nominatim](https://nominatim.org/)
- Be comfortable reading documentation for JavaScript libraries and APIs

## Course Outline

Throughout this 15 week course, you'll be learning to program applications using HTML, CSS, and Javascript. In addition to programming skills, we will stress the "tools of the trade": you will use a text editor designed for programming; your code will be turned in with git and managed through GitHub. You will be programming in the same way and with some of the same tools as software developers in the industry.

We'd like to keep the course somewhat freeform — there are basic skills which must be touched on, but your interests will help shape the direction to a large extent. Most of your practice will come through building three projects in JavaScript, including a self-directed interactive final project that can take any topic you find interesting (so long as you use tools from our class).

This syllabus is a living document. As the course progresses, greater detail will be added to reflect the content of each week.

### Exercises

* You’ll have short exercises to do for almost every class, at least for the first half of the semester
* Exercises will not be graded, but you will be accountable for the skills practiced in them, and we will not always cover all of those skills comprehensively in class, so it is in your best interest to do them in a timely manner.
* Most exercises will be checked automatically; you can always tweak until it works.

### Projects

There will be two structured projects that everyone will take part in:

1. **A Story Map** -- Story maps utilize maps, text, and multimedia to present interactive narratives to engage users and provide accessible geographic context. You will create a story map based on a topic of your choosing. _The focus of this project will be on explaining some topic through a geospatial lens._
2. **A Dashboard** -- Dashboards are a type of data visualization often use common visualization tools such as graphs, charts, and tables to summarize and present related data sets in a way that makes the information easier to understand. You will choose some publicly available data to build a dashboard around, while honing in on the actual use case that drives the work. _The focus of this project will be on helping users make decisions._
3. **An Interactive Final Project** -- Your final project for the class will be decided through a project proposal negotiated with me. The projects should build upon many of the concepts learned throughout the class, and incorporate some significant amount of interactivity. _The focus of this project will be on civic engagement -- i.e. inviting members of the public to create or add to a dataset in some way._

   Final projects will be done in groups or independently — criteria for success will be hammered out in the final project proposal and group projects (if we have any) will be expected to engage with a wider scope and greater difficulty than individual projects. Group projects will also leverage the power of GitHub to make collaboration simpler and more transparent for grading purposes (this will make more sense once you're familiar with GitHub).

## Work Evaluation & Feedback

Regarding grading, your successful completion of the class will be dependent on the successful completion of the minimum requirements of the three projects laid out above.
  
More thorough evaluation of and feedback on your work will come in the form of:
1. Code reviews -- You will submit pull requests (PRs) which the course instructors will leave feedback and suggestions on.
2. Linters -- You will learn to read the output from linters and accessibility checkers, and to use them to debug and improve your work.

## Software
* Code Editors
  * [Visual Studio Code](https://code.visualstudio.com/)
  * [Sublime Text](https://www.sublimetext.com/)
* Terminals
  * [Windows Terminal](https://docs.microsoft.com/en-us/windows/terminal/install)
* Git Clients
  * [GitHub Desktop](https://desktop.github.com/)
  * [Sublime Merge](https://www.sublimemerge.com/)
* Node.js
  * [Node.js](https://nodejs.org/en/download/)

## Supplimentary Resources

* [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - A **highly authoritative** body of documentation on Javascript and many other web development topics.
* [Introduction to Web Mapping](https://geobgu.xyz/web-mapping2/) - A web-based text book specifically for JavaScript-based mapping. A good portion of this class will overlap with the material in this book.
* [Javascript.info](https://javascript.info/) - An excellent linear reference -- like a text book for JavaScript.
* [FreeCodeCamp](https://www.freecodecamp.org/learn/) - Lots of exercises; courses in "Responsive Web Design", "Basic JavaScript", "ES6", and "Data Visualization" would be particularly useful for this class.
* [Eloquent Javascript](http://eloquentjavascript.net/) - This is a free book with some _advanced_ content. As you think about the application you might like to build for your final, the chapters on HTML forms, drawing with javascript, building a game, and constructing your own painting application will push further than we can in class.
* [Map-based Web Application Examples](webmap-examples.md)

There will be additional resources on topics covered in the class in the _[resources/](resources/)_ folder.

### Schedule

> Subject to change as necessary!

| Week | Date | Topic | Project |
| :--: | ---- | ----- | :-----: |
|   1  | 30 Aug | Getting started<br>Intro to Web Tech | Story Map |
|   2  | 06 Sep | Intro CSS (selectors)<br>Debugging layouts | │ |
|   3  | 13 Sep | The Box Model<br>Flexbox and Grid Layouts | │ |
|   4  | 20 Sep | JS Style & Linting<br>Working with Data in JS | ┴ |
|   5  | 27 Sep | DOM Manipulation | Dashboard |
|   6  | 04 Oct | Asynchronous Behavior #1 (events) | │ |
|   7  | 11 Oct | Asynchronous behavior #2 (requests)<br>Browser APIs | │ |
|   8  | 18 Oct | Map Tiles | ┴ |
|   9  | 25 Oct | 3rd-party APIs | Final |
|  10  | 01 Nov | | │ |
|  11  | 08 Nov | | │ |
|  12  | 15 Nov | | │ |
|      | ~~23 Nov~~ |  | │ |
|  13  | 29 Nov | | │ |
|  14  | 06 Dec | Project presentations | ┴ |
|      | 13 Dec | Overflow presentations<br>(if necessary) | |

<!--

#### Week 1 - Getting started
* Git and Github
* Code editing

#### Week 2 - Working with data
* First steps with Javascript/HTML/CSS (playing in the console)
* JavaSCript data types
* JSON
* GeoJSON

#### Week 3 - Designing systems
* Functions
* User stories and project management

#### Week 4 - Asynchronous behavior #1
* The Document Object Model (DOM)
* CSS selectors & the DOM
* Responding to interactive events

#### Week 5 - DOM Manipulation
* The Document Object Model (DOM)
* CSS selectors & the DOM

#### Week 6 - Styles and layouts
* CSS units
* Common CSS layout patterns
* Map tiles

#### Week 7 - Asynchronous behavior #2
* The JavaScript event loop
* Dynamically fetching data
* CSV data

#### Week 8 - Browser APIs
* Fetch (redux)
* Geolocation
* Local Storage

#### Week 9 - 3rd-party APIs
* APIs (using Mapbox and Firestore)

#### Week 10 - A11y, I18n, & L10n
* Accessibility
* Internationalization
* Localization

#### Weeks 11-13 - Possible directions
* Where to find spatial data
* Client-side geospatial analysis (Turf.js)
* D3
* Deck.gl
* Bootstrap
* Using the command line
* Server-side JavaScript (node.js)
* Advanced debugging
* Vector tiles

-->

## Academic Integrity

In compliance with Penn's [Code of Academic Integrity](http://www.upenn.edu/academicintegrity/ai_codeofacademicintegrity.html), blatantly and egregiously copying another student's work will not be tolerated. However, because this course is designed to help prepare students for work in professional programming environments, *copying and pasting is not universally prohibited*: we encourage students to work together and to freely use the internet as a resource for finding solutions to vexing problems. Citing every copied and pasted line of code is *not* necessary. Large patterns or multiple lines of code taken from external sources *should*, however, be noted with in-code comments. If an instance is unclear, you should feel free to speak with the instructors.

### Note about AI tools...

I don't mind generative AI tools to help with coding -- I use them myself on a limited basis. If you use Chat GPT or any other AI tool, note that you are subject to the same guidelines around citation as above.

Also, understand that many of these tools often make mistakes that can be difficult to identify if you don't know what you're doing. If you and can verify that the generated code is correct, cool. But if you come to me or the TA to help debugging something generated with AI, it is always best to disclose the source of the code (for that matter, I'll be able to tell), as it would be with any code.
