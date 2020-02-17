# instanews

## What is the project about

This is a website that gives you a selection of various categoties. Once a category has been selected the site will use the New York times (NYT) API to call and display up to 12 stories.

## Description of how the site works

The site will start off with the NYT logo and a normal selection pull down. it will use an event listener to look for changes and once there is a change it will use the value of that selection and combine it with the URL and key. Then it will fetch the articles of the selected categories using AJAX. The results will then be sent to a filter and discard articles that dont have photos. Then it will grab the first 12 articles and filter out the info needed into an object with only those paramaters and then putting each object into an array. There are 3 possible results at this point:

1. the site does not work. in which case it will display a page load error
2. there are no articles. In which case it will display a no article error
3. everything is ok and will continue on.

Javascript will then create each article according to this structure

                                  <a "link">
              _________________________|_______________________________
              |                        |                               |
    <img "article image">      <img "loader image">            <div "article text" >
            ____________________________________________________________|_____
            |                               |                                 |
    <h3 "title">                      <p "byline">                      <p "abstract">

The page logo size and page layout will change and then it will first display the loader gif. Once it detects that the article image is fully loaded then it will replace the loader gif with the article image and populate the title, byline and (if applicable) the abstract. After this you can select one of the articles or select another category.

## What technologies were used

This site uses the following tehnologies:

### gulp

The gulpfile will use:
terser: to uglify the javascript making them smaller,
rename: to rename the names adequately,
browserSync: to allow us to automatically reload the page as we save changes,
eslint: to give us warnings and errors before we send the files to terser,
sass: to change SASS code into css,
autoPrefixer: older version support
cssnano: to minify the css
prettyError: looks for errors in CSS before compiling
imagemin: compresses images.

### JQuery, Javascript and Ajax

This was mostly coded in vanilla Javascript with some sprinkiling of Jquery as needed. Ajax was used to call the New York Time API.

### SASS

Used for the ability to use variables and better way of separating media queries

### @font-face support

added the custom font-family as required.

### mobile first development

started creating the site with a mobile setting in mind. then added media queries to check for the width and display accordingly.

## what features did I add

These are the features I added to the project to make it unique.

### mobile/table or desktop?

I am checking the media to see if there is the ability to use the mouse. If there is then the abstract will be hidden from the start, otherwise it will be shown from the start.

### pop up abstract with hover & tab focus

If you hover over the text description in a media that has a hover ability (ie desktop) then the abstract will pop up.

Also if you use tab to focus on an article, the abstract will pop up as well.

### category selection

decided to give put in all the allowed selections from NYT.

### loader GIF

I attached the loader gif to each article. It will display the loader gif while the article loads. Once the loading is done it will switch and display the article image instead.

### image proportions and box sizing

I have used all my measurements to measure agaisnt the width of the media thus keeping the aspect ratio of the containers as you manually resize the window.

I have also used object fit to keep the aspect ratio of the photos the same.

### grip gap

added grip gap to each photo go give it a more professional look

## what difficultied did I encounter

In no type of order:

### attaching elements together

Trying to attach each of the elements together for the structure I wanted. was having problems with some of them attaching as objects.

### spans

didnt realize I could house a div inside an <a> tag. was able to organize it better once I did div.

### loader gif

It looks like <img> does not like a compressed gif. Compressed gif worked with background-images. Had to switch from using the gif in the build directory and use the one in the assets directory.

### still have some syntax error

as I waddle thru everything I have learned I am, although less each day, still mixing up the syntax of the different formats I have used. I made some functions at the beggining and I could not figure out why it wasnt working until I realized I was writing it llike an object method instead of a javascript function.

### just overall " can this be done?"

a lot of searching and figuring out if it can done and then figuring out how to do it.

### certain things not working in firefox inspector

it looks like the tab focus does not work on firefox developer edition.

### not targetting the proper file javascript file.

after learning about gulp and minimizing the files, i forgot to change the diretory and file name for the javascript source.
