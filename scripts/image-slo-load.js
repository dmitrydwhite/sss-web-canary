var pics = {
  'warming-shelter': [
    {
      path: './assets/vision/warming-shelter/second-two.png',
      altText: 'The interior of Oak Street Church provides shelter to our unhoused neighbors',
      width: 261,
      height: 405
    },
    {
      path: './assets/vision/warming-shelter/second-one.png',
      altText: 'Volunteers serve food to warming shelter guests at Oak Street Church',
      width: 607,
      height: 405
    },
  ]
};

var imageContainers = Array.prototype.slice.call(document.getElementsByClassName('image-container'));
var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;

function isInViewport(elem) {
  var elemBounds = elem.getBoundingClientRect();
  var top = elemBounds.top;
  var bottom = elemBounds.bottom;

  return top >= 0 && bottom <= viewportHeight;
}

function hasNotAddedImages(elem) {
  return !elem.hasAddedImages;
}

function calculateImagesWidth(el) {
  return Array.prototype.slice.call(el.getElementsByTagName('img'))
    .reduce(function (accum, curr) {
      return accum + (curr.width || curr.clientWidth);
    }, 0);
}

function calculateCurrentIndex(el) {
  return Array.prototype.slice.call(el.getElementsByTagName('img')).length - 1;
}

function addImagesToElem(elem, imgMap, currWidth, idx) {
  var nextImg = document.createElement('img');
  var loadImgData = imgMap[idx];
  var calculatedWidth;
  var currentIdx;

  if (loadImgData) {
    // Create the new element
    nextImg.src = loadImgData.path;
    nextImg.alt = loadImgData.altText;
    nextImg.classList.add('sub-image');
    nextImg.classList.add('new-image');
    nextImg.setAttribute('data-img-idx', idx);
  
    // Calculate the new width and index, and attach them to the container image map
    calculatedWidth = currWidth + loadImgData.width;
    currentIdx = idx + 1;
  
    // Append the image if it will fit
    if (calculatedWidth < elem.clientWidth) {
      elem.appendChild(nextImg);
      nextImg.classList.remove('new-image');
      addImagesToElem(elem, imgMap, calculatedWidth, currentIdx);
    }
  }
}

function removeImagesFromElem(elem, imgMap, currWidth, idx) {
  var currentImgData = imgMap[idx];
  var calculatedWidth, imgToRemove;

  if (currentImgData && idx >= 0) {
    calculatedWidth = calculateImagesWidth(elem) - currentImgData.width;
    imgToRemove = document.querySelectorAll('[data-img-idx=' + ix + ']');

    elem.removeChild(imgToRemove);

    if (calculatedWidth > currWidth) {
      removeImagesFromElem(elem, imgMap, calculatedWidth, idx-1);
    }
  }
}

function manageIncludedImages(elem) {
  var imagesFor = elem.getAttribute('data-container-for'); // ID this element
  var containerImageMap = pics[imagesFor];
  var calculatedWidth = calculateImagesWidth(elem);
  var currentIdx = calculateCurrentIndex(elem);

  if (calculatedWidth < elem.clientWidth) {
    addImagesToElem(elem, containerImageMap, calculatedWidth, currentIdx);
  } else {
    removeImagesFromElem(elem, containerImageMap, calculatedWidth, currentIdx);
  }

  // // debugger;
  // var imagesFor = elem.getAttribute('data-container-for'); // ID this element
  // var allImgs = pics[imagesFor]; // Associate the images array
  // var currentImages = Array.prototype.slice.call(elem.getElementsByTagName('img'));
  // var currentWidth = currentImages.reduce(function(accum, curr) {
  //   return accum + curr.width;
  // }, 0);
  // var loaderIdx = currentImages.length - 1; // Calculating how many images are left
  // var shouldAdd = allImgs[loaderIdx] &&
  //   (currentWidth + allImgs[loaderIdx].width < elem.clientWidth);
  // var shouldSubtract = currentWidth > elem.clientWidth;
  
  // while (shouldAdd) {
  //   var nextImg = document.createElement('img');
  //   var loadImgData = allImgs[loaderIdx];

  //   nextImg.src = loadImgData.path;
  //   nextImg.alt = loadImgData.altText;
  //   nextImg.setAttribute('data-img-idx', loaderIdx);
  //   elem.appendChild(nextImg);
  //   currentWidth += loadImgData.width;
  //   loaderIdx += 1;
  //   shouldAdd = allImgs[loaderIdx] && (currentWidth + allImgs[loaderIdx].width < elem.clientWidth);
  // }

  // while (shouldSubtract) {
  //   var imgToRemove = document.querySelectorAll('[data-img-idx=' + loaderIdx + ']');

  //   if (imgToRemove) elem.removeChild(imgToRemove);
  //   loaderIdx -= 1;
  //   shouldSubtract = Array.prototype.slice.call(elem.getElementsByTagName('img')).reduce(function(accum, curr) {
  //     return accum + curr.width;
  //   }, 0) > elem.clientWidth;
  // }

  // if (!shouldKeepAdding) elem.hasAddedImages = true;
}

function checkContainerVisible() {
  imageContainers.forEach(function(containerEl) {
    if (isInViewport(containerEl)) {
      manageIncludedImages(containerEl);
    }
  });
}

(function() {
  window.addEventListener('scroll', checkContainerVisible);
  window.addEventListener('resize', checkContainerVisible);
}());