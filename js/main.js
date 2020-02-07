document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("section-selection");
  // const masterList = document.createElement("list");
  // const masterList = $("#list");
  console.log(btn);
  btn.addEventListener("change", function() {
    $.ajax({
      method: "GET",
      url: `https://api.nytimes.com/svc/topstories/v2/${btn.value}.json?api-key=5Fuweavf9NF1wpoTCAyGX4XZ7DMCtztz`
    }).done(function(data) {
      console.log(data);
      // console.log(btn.option.value);
      // data.forEach(item => {
      //   masterList.append(`<li> ${item.name} </li>`);
      // const li = document.createElement("li");
      // li.innerText = item.name;
      // masterList.append(li);
    });

    // .fail(function() {
    //   masterList.append(`<li> Sorry something went wrong</li>`);
    // });
  });
}); // end of doc
