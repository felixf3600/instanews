document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("section-selection");
  const hover = document.getElementsByClassName("description");
  btn.addEventListener("change", function() {
    let topStories = [];
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${btn.value}.json?api-key=5Fuweavf9NF1wpoTCAyGX4XZ7DMCtztz`
    })
      .done(function(data) {
        changeHeader();
        // setTimeout(function(){

        // });
        topStories = populate(data);
        displayStories(topStories);
      })
      .fail(function() {
        displayError("Sorry something went wrong");
      });
  });

  function changeHeader() {
    const $newLogo = $(".logo");
    const $newHeader = $("header");
    $newLogo.addClass("shrunkLogo");
    $newHeader.addClass("shrunkHeader");
  }

  function displayError(message) {
    const news = document.getElementById("news");
    const error = document.createElement("h2");
    error.innerText = message;
    news.append(error);
  }

  // this function grabs the article info and puts it in an object
  function getArticle(counter, data) {
    const news = {
      title: data[counter].title, // grabs the title of the article
      abstract: data[counter].abstract, // grabs the abstract of the article
      byLine: data[counter].byline, // grabs the bylilne of the article
      url: data[counter].url, // grabs the url of the article
      photoSuperSize: data[counter].multimedia[0].url, // grabs the url of the photo
      captionSuperSize: data[counter].multimedia[0].caption // grabs the caption of the photo
    };
    return news; // returns the object
  }

  // this does a foreach loop and grabs the info for each article and puts them in an array for easy access
  function populate(data) {
    const topArticles = [];
    //filters the articles for articles with images only, for images with an image with an url and caption on the supersized image. the others are too small to use.
    const articlesWithImages = data.results.filter(
      item =>
        item.multimedia &&
        item.multimedia.length &&
        item.multimedia[0].url &&
        item.multimedia[0].caption
    );
    // uses a for loop to makesure that only up to 12 articles are visible and does not crash if less than 12.
    for (
      let counter = 0;
      counter < 12 && counter < articlesWithImages.length;
      counter++
    ) {
      topArticles[counter] = getArticle(counter, articlesWithImages);
    }
    return topArticles; // returns the array of stories for processing
  }

  // uses a foreach to put the array of stories into the HTML in the form of an <a> tag with an image and
  //span tags inside. <a> <img> <span> <span></span> <span></span> <span</span> </span> </a>
  function displayStories(storiesArray) {
    const articlesArea = document.getElementById("news");
    // let counter = 1;
    articlesArea.innerHTML = " ";
    storiesArray.forEach(article => {
      const div = document.createElement("div");
      const aTag = document.createElement("a");
      const image = document.createElement("img");
      createImage(image, article);
      div.setAttribute("class", "description");
      createP(div, article);
      createATag(/*counter,*/ aTag, div, image, article);
      articlesArea.appendChild(aTag);
      // counter++;
    });
  }
  //creates the image tag adding the src and alt to it
  function createImage(image, article) {
    image.setAttribute("src", article.photoSuperSize);
    image.setAttribute("alt", article.captionSuperSize);
  }
  //this creates the complex description span that houses the abstract span, the title span and the byline span
  function createP(span, article) {
    const byLineP = document.createElement("p");
    const titleP = document.createElement("h3");
    const abstractP = document.createElement("p");
    byLineP.setAttribute("class", "byline");
    titleP.setAttribute("class", "title");
    abstractP.setAttribute("class", "abstract hidden");
    byLineP.innerText = article.byLine;
    titleP.innerText = article.title;
    abstractP.innerText = article.abstract;
    span.appendChild(titleP);
    span.appendChild(byLineP);
    span.appendChild(abstractP);
  }
  // this function puts puts the a tag together
  function createATag(/*counter,*/ aTag, span, image, article) {
    aTag.setAttribute("href", article.url);
    aTag.setAttribute("class", "article");
    aTag.appendChild(image);
    aTag.appendChild(span);
  }
}); // end of doc

// hover.addEventListener("onmouseover", function() {
//   hover.classList.toggle("expand");
// });

// hover.addEventListener("onmouseout", function() {
//   hover.classList.toggle("expand");
// });
