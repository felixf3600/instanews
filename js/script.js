(function() {
  function test() {
    let x = 12554254;
    let y = 34;

    const testElem = document.getElementById("test");
    testElem.innerHTML += x = y;
    alert(testElem.innerText);
  }

  test();
})();
