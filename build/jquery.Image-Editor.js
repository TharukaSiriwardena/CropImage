(function() {
  var $;

  $ = jQuery;

  $.ImageEditor = function(inputAttachTo, options) {
    var $applyButton, $cancelButton, $container, $cropSandbox, $fileSelect, $imagesContainer, $inputAttachTo, $progressBar, $resultIm, $sourceIm, $urlSelect, $urlSelectButton, a, cleanImages, div, drawImage, fileAllowed, handleDragOver, handleDropFileSelect, handleFileSelect, image, input, log, readFile, removeAreaSelect, removeLoading, saveCrop, setAreaSelect, setImages, setLoading, setOriginalSize, settings;
    settings = {
      width: 600,
      height: 100,
      debug: false
    };
    settings = $.extend(settings, options);
    log = function() {
      if (settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(arguments) : void 0;
      }
    };
    $inputAttachTo = $(inputAttachTo);
    input = function(type) {
      return $("<input type = \"" + type + "\" />");
    };
    div = function() {
      return $("<div/>");
    };
    a = function(text) {
      return $("<a href=\"#\">" + text + "</a>");
    };
    image = function() {
      return $('<img/>');
    };
    $container = div().insertAfter($inputAttachTo).addClass('Image-Editor');
    $cropSandbox = $('<canvas></canvas>');
    $cropSandbox.attr({
      width: settings.width,
      height: settings.height
    });
    $container.append($cropSandbox);
    $fileSelect = input('file');
    $container.append($fileSelect);
    if (settings.proxy_path !== void 0) {
      $urlSelect = input('text');
      $urlSelectButton = input('button');
      $urlSelectButton.val('Upload from url');
      $container.append(div().addClass('form-group').append($urlSelect).append($urlSelectButton));
    }
    $progressBar = div().addClass('progress hide').append(div().addClass('progress-bar').attr({
      role: 'progressbar',
      'aria-valuenow': "60",
      'aria-valuemin': "0",
      'aria-valuemax': "100",
      style: "width: 60%;"
    }));
    $container.append($progressBar);
    $resultIm = image();
    $container.append($resultIm);
    $sourceIm = image();
    $applyButton = a('Apply').addClass('btn yes btn-primary');
    $cancelButton = a('Cancel').addClass('btn btn-danger').attr({
      'data-dismiss': "modal"
    });
    $imagesContainer = div().append(div().addClass('modal-dialog').append(div().addClass('modal-content').append(div().addClass('modal-body').append(div().addClass('col-md-9').append($sourceIm)).append(div().addClass('col-md-3').append($cropSandbox)).append(div().addClass('clearfix')), div().addClass('modal-footer').append(div().addClass('btn-group').append($cancelButton).append($applyButton))))).addClass('modal').attr({
      role: 'dialog'
    });
    $container.append($imagesContainer);
    removeAreaSelect = function(image) {
      return image.imgAreaSelect({
        remove: true
      });
    };
    cleanImages = function() {
      var im;
      removeAreaSelect($sourceIm);
      im = $sourceIm;
      $sourceIm = image();
      return im.replaceWith($sourceIm);
    };
    setLoading = function() {
      return $progressBar.removeClass('hide');
    };
    removeLoading = function() {
      $imagesContainer.on('shown.bs.modal', function() {
        return setAreaSelect($sourceIm);
      }).on('hidden.bs.modal', function() {
        return cleanImages();
      }).modal();
      return $progressBar.addClass('hide');
    };
    setOriginalSize = function(img) {
      var tempImage;
      tempImage = new Image();
      tempImage.onload = function() {
        return img.attr({
          'data-original-width': tempImage.width,
          'data-original-height': tempImage.height
        });
      };
      return tempImage.src = img.attr('src');
    };
    setImages = function(uri) {
      return $sourceIm.attr('src', uri).load(function() {
        removeLoading();
        return setOriginalSize($sourceIm);
      });
    };
    drawImage = function(img, x, y, width, height) {
      var context, destHeight, destWidth, destX, destY, oHeight, oWidth, r, sourceHeight, sourceWidth, sourceX, sourceY;
      oWidth = img.attr('data-original-width');
      oHeight = img.attr('data-original-height');
      if (oWidth > oHeight) {
        r = oHeight / img.height();
      } else {
        r = oWidth / img.width();
      }
      sourceX = Math.round(x * r);
      sourceY = Math.round(y * r);
      sourceWidth = Math.round(width * r);
      sourceHeight = Math.round(height * r);
      destX = 0;
      destY = 0;
      destWidth = settings.width;
      destHeight = settings.height;
      context = $cropSandbox.get(0).getContext('2d');
      return context.drawImage(img.get(0), sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    };
    setAreaSelect = function(image) {
      var viewPort, x2, y2,
        _this = this;
      viewPort = $(window).height() - 150;
      if ($sourceIm.height() > viewPort) {
        $sourceIm.css({
          height: viewPort + "px"
        });
      }
      log(image.width(), image.height());
      if (image.width() / settings.width >= image.height() / settings.height) {
        y2 = image.height();
        x2 = Math.round(settings.width * (image.height() / settings.height));
      } else {
        x2 = image.width();
        y2 = Math.round(settings.height * (image.width() / settings.width));
      }
      log(x2, y2, image.width(), image.height());
      drawImage($sourceIm, 0, 0, x2 - 1, y2 - 1);
      return image.imgAreaSelect({
        aspectRatio: "" + settings.width + ":" + settings.height,
        handles: true,
        x1: 0,
        y1: 0,
        x2: x2,
        y2: y2,
        onSelectEnd: function(img, selection) {
          return drawImage($sourceIm, selection.x1, selection.y1, selection.width - 1, selection.height - 1);
        }
      });
    };
    fileAllowed = function(name) {
      var res;
      res = name.match(/\.(jpg|png|gif|jpeg)$/mi);
      if (!res) {
        alert('Only *.jpeg, *.jpg, *.png, *.gif files allowed');
        return false;
      } else {
        return true;
      }
    };
    readFile = function(file) {
      var reader;
      reader = new FileReader();
      setLoading();
      reader.onload = function(e) {
        return setImages(e.target.result);
      };
      return reader.readAsDataURL(file);
    };
    handleDropFileSelect = function(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      if (evt.originalEvent.dataTransfer.files[0] !== void 0) {
        if (!fileAllowed(evt.originalEvent.dataTransfer.files[0].name)) {
          return;
        }
        return readFile(evt.originalEvent.dataTransfer.files[0]);
      }
    };
    handleDragOver = function(e) {
      e.originalEvent.dataTransfer.dropEffect = "copy";
      e.stopPropagation();
      return e.preventDefault();
    };
    handleFileSelect = function(evt) {
      if (evt.target.files[0] !== void 0) {
        if (!fileAllowed(evt.target.files[0].name)) {
          return;
        }
        readFile(evt.target.files[0]);
        return evt.target.value = "";
      }
    };
    saveCrop = function() {
      var result;
      result = $cropSandbox.get(0).toDataURL();
      $resultIm.attr('src', result);
      $inputAttachTo.val(result);
      return cleanImages();
    };
    $fileSelect.on('change', handleFileSelect);
    $container.on('dragover', handleDragOver);
    $container.on('drop', handleDropFileSelect);
    if (settings.proxy_path !== void 0) {
      $urlSelect.on('dragover', handleDragOver);
      $urlSelect.on('drop', handleDropFileSelect);
      $urlSelectButton.click(function() {
        var url;
        if (!$urlSelect.val().match(/^(https?:\/\/)?/)) {
          return;
        }
        if (!fileAllowed($urlSelect.val())) {
          return;
        }
        setLoading();
        url = settings.proxy_path.replace(/:url/, $urlSelect.val());
        return $.get(url).done(function(data) {
          return setImages(data);
        }).fail(function(jqXNR, textStatus) {
          $progressBar.addClass('hide');
          return alert("Failed to load image");
        });
      });
    }
    $cancelButton.on('click', function() {
      return cleanImages();
    });
    return $applyButton.on('click', function() {
      saveCrop();
      return $imagesContainer.modal('hide');
    });
  };




  $.fn.extend({
    ImageEditor: function(options) {
      return this.each(function() {
        if ($(this).data("ImageEditor")) {
          if (options.remove) {
            $(this).data("ImageEditor").remove();
            $(this).removeData("ImageEditor");
          } else {
            $(this).data("ImageEditor").setOptions(options);
          }
        } else if (!options.remove) {
          $(this).data("ImageEditor", new $.ImageEditor(this, options));
        }
        if (options.instance) {
          return $(this).data("ImageEditor");
        }
        return this;
      });
    }
  });

}).call(this);
