document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("section-selection");
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
  function getArticle(counter, data) {
    const news = {
      title: data[counter].title,
      abstract: data[counter].abstract,
      byLine: data[counter].byline,
      url: data[counter].url,
      photo: data[counter].multimedia[0].url,
      caption: data[counter].multimedia[0].caption
    };
    return news;
  }
  function populate(data) {
    const topArticles = [];
    for (
      let counter = 0;
      counter < 12 && counter < data.results.length;
      counter++
    ) {
      topArticles[counter] = getArticle(counter, data.results);
    }
    return topArticles;
  }

  function displayStories(storiesArray) {
    const articlesArea = document.getElementById("news");
    let counter = 1;
    articlesArea.innerHTML = " ";
    storiesArray.forEach(article => {
      const span = document.createElement("span");
      const aTag = document.createElement("a");
      const image = document.createElement("img");
      createImage(image, article);
      span.setAttribute("class", "description");
      createSpan(span, article);
      createATag(counter, aTag, span, image, article);
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

  function createATag(counter, aTag, span, image, article) {
    aTag.setAttribute("href", article.url);
    aTag.setAttribute("class", "article");
    aTag.setAttribute("id", `article${counter}`);
    aTag.appendChild(image);
    aTag.appendChild(span);
  }
}); // end of doc
