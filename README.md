# Interactive Visualizations Challenge
> How can we make visualizations on a website and have it be responsive to user input?
## Folder Contents
- A `static` folder containing just one `js` folder containing an `app.js` file that handles the logic and functionality of the website.
- An `index.html` file that imports all the Javascript modules needed and builds a basic framework for the visual sructure of our website.
  - *NOTE: No CSS code here. This is an exercise in handling other modules so we used Bootstrap's default visual settings to save time.*
- An *unused* `samples.json` file that is a physical, offline representation of what the imported dataset should be in case the URL used in the Javascript file ever changes or goes down. The data we used is extracted online from [this particular Amazon Web Services link]("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").

### Installation/Prerequisites
- As long as you have a browser that's compatible with post-ES6 Javascript, you should be able to run the website or pull the directory to run the HTML locally on your web browser.
#### Imported Modules
- Any dependencies we used are all pulled online from CDNs and official releases, but please refer to the links below if you want to examine the specific version used in this project or download the modules with NPM for work with Node.js:
  - [Bootstrap 3.3.7](https://blog.getbootstrap.com/2016/07/25/bootstrap-3-3-7-released/) as our basic acceptable visual styling.
  - [D3 v7](https://d3js.org/getting-started#d3-in-vanilla-html) to read JSON files and handle DOM tree element manipulation.
  - [Plotly 2.24.1](https://plotly.com/javascript/getting-started/) to handle interactive data visualization and append charts to the DOM tree.

## View it Online
This project is hosted as a [GitHub Pages Website](https://alexpei-yutsai.github.io/belly-button-challenge) and can be viewed simply by clicking the hyperlink in this sentence. 

### Website Contents
Assuming everything loaded in correctly, there should be 5 major components, excluding the static header on top that tells you what to do:
- A dropdown menu with all the subjects of the extracted JSON dataset as selectable options.

Changing the value selected in the dropdown menu should change the contents of:
- A table about the selected subject.
- A horizontal bar chart about the selected subject.
- A gauge chart about the selected subject.
- A bubble chart about the selected subject.

### Data Context
For any explanations on the metrics or units used and what any of the data means, please refer to the [Public Science Lab](http://robdunnlab.com/projects/belly-button-biodiversity/) and [its relevant paper](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0047712) from where the data is collected.

## Code Breakdown
As most of the reasoning and coding techniques are discussed at length in the comments of Javascript file, this part will be about the workflow of our data visualization project.

### Loading and Updating

D3 allows you to load in your data and, upon successfully loading in the data, do things to it:

```javascript
// Load data, have it handle Promises and that mess
d3.json(someURL).then(function (thatData){
  // Do stuff to the data

  // Example 1: Iteratively creating elements
  // You can use this to add list items, dropdown options, and anything with a variable amount of lines by using loops to do so
  for (let i=0; i<thatData.someArray.length; i++){
    // Adds elements with some iteratively defined features to a parent element
    d3.select("#someParentElement").append("someTag").text(data.someArray[i]).attr("someAttribute", someValue);
  };

  // ...
});
```
Suppose you have a specific location where you'd like to place your chart.
```html
<!-- ... -->
  <!-- ... -->
      <div id="someDivElement"></div>
  <!-- ... -->
<!-- ... -->
```
You can also initialize your Plotly charts after importing your data. 
```javascript
let data = thatDataYouLoadedIn;

// The data you plot are packaged in "traces". Plural because you could have multiple lines on the same plot, so you'll need to pass it with an array of dictionaries.
let yourTraces = [{
  x:data.arrayOfIndividuals[someIndexValue].arrayOfValuesA,
  y:data.arrayOfIndividuals[someIndexValue].arrayOfValuesB,
  text:data.arrayOfIndividuals[someIndexValue].arrayOfLabels,
  type:"someTypeOfChart"
}];

// The layout used to stylize the plot
let yourLayout = {
  title:"someTitle",
  someProperty:someValue
};

// Placing the plot somewhere we like on the DOM tree with our previously defined parameters
Plotly.newPlot("someDivElement", yourTraces, yourLayout);
```
![A sample picture of some default charts and their configurations](https://cdn.discordapp.com/attachments/939673945240637450/1134761998941421628/image.png)

In order to change the data displayed, you can pass a function into a form, toggle, or some interactive element in the HTML code. For example, a Dropdown Menu:
```html
<select id="yourDropdown" onchange="optionChanged(this.value)"></select>
```
The value of the dropdown, defined by the option a user would select, 


![A sample picture of the charts after a different value is selected from the dropdown menu](https://cdn.discordapp.com/attachments/939673945240637450/1134763128702386187/image.png)
## Resources that helped a lot
- Official documentation for [Plotly (Javascript)](https://plotly.com/javascript/) is, unfortunately, terribly vague and unhelpful as they are a Python library first and Javascript API last. Many inquiries we had needed to be answered through a 3rd party source on the internet because they didn't demonstrate how to use their most basic functionalities on their website. Go figure.
  - For example, for some incomprehensible reason, `Plotly.update()`'s syntax doesn't work intuitively and you have to [wrap your updated content with an extra set of brackets](https://stackoverflow.com/a/60713918) to get it to work.
- As we are working in Javascript, frequent trips to their official documentation is *highly* encouraged and *actually* valuable.
  - Just a quick note: When using lambda/arrow functions to pass in dictionaries, make sure to [wrap them in parentheses so the compiler doesn't confuse it for a function you're calling](https://stackoverflow.com/a/40348205).
- [D3](https://d3js.org/), much like jQuery, is good for DOM tree traversal and manipulation. However, it's best for data visualization and usage in conjunction with graphing libraries such as Plotly.

## FINAL NOTES
> Project completed on July 27, 2023
