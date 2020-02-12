document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("section-selection");
  const hover = document.getElementsByClassName("description");
  btn.addEventListener("change", function() {
    let topStories = [];
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${btn.value}.json?api-key=5Fuweavf9NF1wpoTCAyGX4XZ7DMCtztz`
    }).done(function(data) {
      topStories = populate(data);
      displayStories(topStories);
      // .fail(function() {
      //   masterList.append(`<li> Sorry something went wrong</li>`);
      // });
    });
  });

  // hover.addEventListener("onmouseover", function() {
  //   hover.classList.toggle("expand");
  // });

  // hover.addEventListener("onmouseout", function() {
  //   hover.classList.toggle("expand");
  // });

  // this function grabs the article info and puts it in an object
  function getArticle(counter, data) {
    const news = {
      title: data[counter].title, // grabs the title of the article
      abstract: data[counter].abstract, // grabs the abstract of the article
      byLine: data[counter].byline, // grabs the bylilne of the article
      url: data[counter].url, // grabs the url of the article
      photo: data[counter].multimedia[0].url, // grabs the url of the photo
      caption: data[counter].multimedia[0].caption // grabs the caption of the photo
    };
    return news; // returns the object
  }

  // this does a foreach loop and grabs the info for each article and puts them in an array for easy access
  function populate(data) {
    const topArticles = [];
    for (
      let counter = 0;
      counter < 12 && counter < data.results.length;
      counter++
    ) {
      topArticles[counter] = getArticle(counter, data.results);
    }
    return topArticles; // returns the array of stories for processing
  }

  // uses a foreach to put the array of stories into the HTML in the form of an <a> tag with an image and span tags inside
  function displayStories(storiesArray) {
    const articlesArea = document.getElementById("news");
    // let counter = 1;
    articlesArea.innerHTML = " ";
    storiesArray.forEach(article => {
      const span = document.createElement("span");
      const aTag = document.createElement("a");
      const image = document.createElement("img");
      createImage(image, article);
      span.setAttribute("class", "description");
      createSpan(span, article);
      createATag(/*counter,*/ aTag, span, image, article);
      articlesArea.appendChild(aTag);
      counter++;
    });
    console.log(articlesArea);
  }

  function createImage(image, article) {
    image.setAttribute("src", article.photo);
    image.setAttribute("alt", article.caption);
  }

  function createSpan(span, article) {
    const byLineSpan = document.createElement("span");
    const titleSpan = document.createElement("span");
    const abstractSpan = document.createElement("span");
    byLineSpan.setAttribute("class", "byline");
    titleSpan.setAttribute("class", "title");
    abstractSpan.setAttribute("class", "abstract");
    byLineSpan.innerText = article.byLine;
    titleSpan.innerText = article.title;
    abstractSpan.innerText = article.abstract;
    span.appendChild(titleSpan);
    span.appendChild(byLineSpan);
    span.appendChild(abstractSpan);
  }

  function createATag(/*counter,*/ aTag, span, image, article) {
    aTag.setAttribute("href", article.url);
    aTag.setAttribute("class", "article");
    // aTag.setAttribute("id", `article${counter}`);
    aTag.appendChild(image);
    aTag.appendChild(span);
  }
}); // end of doc
