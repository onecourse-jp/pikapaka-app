import React from "react";
import {hasFaceInImage} from "../../utils/faceDetection";
export default function ImagePickerScreen({options, callback}) {
  const useFaceDetection = options?.useFaceDetection ?? false;
  // TODO: check for image and call hasFaceInImage(imageUrl) if useFaceDetection is true
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onclick = (event) => {
    // let file = e.target.files[0];
    var target = event.target || event.srcElement;
    console.log("event click", target.files);
  };

  input.onchange = (event) => {
    // let file = e.target.files[0];
    var target = event.target || event.srcElement;
    console.log("event change", target.files);
    if (target.length == 0) {
      // no file choosen
    } else {
      let fileReader = new FileReader();
      global.showLoadingView();
      fileReader.onloadend = function (e) {
        var myImage = new Image(); // Creates image object
        myImage.src = e.target.result; // Assigns converted image to image object
        myImage.onload = async function () {
          let canvas = document.createElement("canvas"); // Creates a canvas object
          var context = canvas.getContext("2d"); // Creates a contect object
          canvas.width = myImage.width; // Assigns image's width to canvas
          canvas.height = myImage.height; // Assigns image's height to canvas
          context.drawImage(myImage, 0, 0); // Draws the image on canvas
          if (useFaceDetection) {
            const hasFace = await hasFaceInImage(canvas);
            console.log(hasFace);
            if (!hasFace) {
              global.showConfirmModal({
                title: global.t("face_not_presented_in_image"),
                type: "error",
                btnOkText: "OK",
                onOkCallback: (navigation) => {
                  global.hideLoadingView();
                  navigation.goBack();
                },
                // onCancelCallback: () => {},
                timeout: 1000,
                buttonVisible: true,
              });
              return;
            }
          }
          let result = target.files[0];
          const displayUrl = URL.createObjectURL(result);
          result.displayUrl = displayUrl;
          let nameAfter = result.name.toLowerCase();
          console.log("nameAfter", nameAfter);
          result.name = nameAfter;
          console.log("resultresultresultresultresult", result);
          callback([result]);
          global.hideLoadingView();
        };
      };
      fileReader.readAsDataURL(target.files[0]);
    }
  };
  input.click();

  return (
    <></> // fake react component
  );
}
