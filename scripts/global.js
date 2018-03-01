// global imports
import styles from "./../css/styles.css";
import Flickity from "flickity";

var elem = document.querySelector(".main-carousel");

if (elem) {
  var flkty = new Flickity(elem, {
    // options
    cellAlign: "left",
    contain: true
  });

  // element argument can be a selector string
  //   for an individual element
  var flkty = new Flickity(".main-carousel", {
    // options
  });
}
