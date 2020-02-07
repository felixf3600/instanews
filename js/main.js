document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("section-selection");
  btn.addEventListener("change", function() {
    let topStories = [];
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${btn.value}.json?api-key=5Fuweavf9NF1wpoTCAyGX4XZ7DMCtztz`
    }).done(function(data) {
      console.log(data);
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
      photo: data[counter].multimedia[4].url
    };
    return news;
  }
  function populate(data) {
    const topArticles = [];
    for (
      let counter = 0;
      counter < 12 && counter <= data.results.length;
      counter++
    ) {
      topArticles[counter] = getArticle(counter, data.results);
    }
    return topArticles;
  }

  function displayStories(storiesArray, counter) {
    const articlesArea = document.getElementById("news");
    articlesArea.innerHTML = " ";
    storiesArray.forEach(article => {
      const span = document.createElement("span");
      const aTag = document.createElement("a");
      const image = document.createElement("img");
      image.innerHTML = createImage(article);
      span.innerHTML = createSpan(article);
      aTag.innerHTML = createATag(counter, aTag, span, image, article);
      articlesArea.appendChild(aTag);
    });
  }

  function createATag(article) {}

  function createSpan(article) {}

  function createImage(counter, aTag, span, image, article) {}
}); // end of doc
