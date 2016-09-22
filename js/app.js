// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
var twitterOptions = {},
  pinitOptions = {},
  emailOptions = {},
  wLeft = screen.width / 2 - 550 / 2,
  wTop = screen.height / 2 - 420 / 2,
  windowOptions = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=550, height=420 top=" + wTop + ", left=" + wLeft,
  source = $("#entry-template").html(),
  template = Handlebars.compile(source),
  context = {
    form: [{
        id: "fbShare",
        formName: "FaceBook Share",
        slideId: "panel1c",
        active: true,
        formElemnts: [
          {
            input: true,
            name: "funkName",
            placeholder: "Share Name*",
            required: true,
            type: "text"
		},
          {
            placeholder: "quote",
            textarea: true,
            name: "quote"
		},
          {
            placeholder: "Description*",
            textarea: true,
            required: true,
            name: "description"
		},
          {
            input: true,
            name: "picture",
            placeholder: "Image URL*",
            required: true,
            type: "url"
				},
          {
            input: true,
            name: "href",
            placeholder: "Page Link*",
            required: true,
            type: "url"
				},
			],
        linkName: "FB"
		},
      {
        id: "fb",
        formName: "FaceBook Feed",
        slideId: "panel2c",
        formElemnts: [
          {
            input: true,
            name: "funkName",
            placeholder: "Share Name*",
            required: true,
            type: "text",
				},
          {
            placeholder: "Description*",
            textarea: true,
            required: true,
            name: "description"
				},
          {
            input: true,
            name: "name",
            placeholder: "Title*",
            required: true,
            type: "text"
				},
          {
            input: true,
            name: "picture",
            placeholder: "Image URL*",
            required: true,
            type: "url"
				},
          {
            input: true,
            name: "link",
            placeholder: "Page Link*",
            required: true,
            type: "url"
				},
			],
        linkName: "FB"
		},
      {
        id: "twitter",
        formName: "Twitter",
        slideId: "panel3c",
        formElemnts: [
          {
            input: true,
            name: "funkName",
            placeholder: "Share Name*",
            required: true,
            type: "text"
				},
          {
            placeholder: "Message*",
            textarea: true,
            required: true,
            name: "text"
				},
          {
            input: true,
            name: "hashtags",
            placeholder: "hashtag",
            type: "text"
				},
          {
            input: true,
            name: "url",
            placeholder: "URL",
            type: "url"
				}
			],
        linkName: "Twitter"
		},
      {
        id: "email",
        formName: "Email",
        slideId: "panel4c",
        formElemnts: [
          {
            input: true,
            name: "funkName",
            placeholder: "Share Name*",
            required: true,
            type: "text"
				},
          {
            placeholder: "Email Meassage*",
            textarea: true,
            required: true,
            name: "message"
				},
          {
            input: true,
            name: "subject",
            placeholder: "Subject*",
            type: "text",
            required: true,
				},
			],
        linkName: "Email"
		},
      {
        id: "pinit",
        formName: "Pinterest",
        slideId: "panel4c",
        formElemnts: [
          {
            input: true,
            name: "funkName",
            placeholder: "Share Name*",
            required: true,
            type: "text"
				},
          {
            placeholder: "Meassage*",
            textarea: true,
            required: true,
            name: "description"
				},
          {
            input: true,
            name: "url",
            placeholder: "link*",
            required: true,
            type: "url"
				},
          {
            input: true,
            name: "media",
            placeholder: "Image URL*",
            required: true,
            type: "url"
				},
			],
        linkName: "Pinterest"
		}],
  },
  html = template(context),

  fbOptions = {
    app_id: "184859551535099",
    display: "popup",
    redirect_uri: "http://socialshare.carlosagosto.com/close.html"
  },
  fbSettings = {
    baseURL: "https://www.facebook.com/dialog/feed",
    pageName: "Facebook"
  },
  fbShareOptions = {
    app_id: "184859551535099",
    display: "popup",
    redirect_uri: "http://socialshare.carlosagosto.com/close.html"
  },
  fbShareSettings = {
    baseURL: "https://www.facebook.com/dialog/share",
    pageName: "Facebook"
  },
  fbSettings = {
    baseURL: "https://www.facebook.com/dialog/feed",
    pageName: "Facebook"
  },
  twitterSettings = {
    baseURL: "https://twitter.com/intent/tweet",
    pageName: "Twitter"
  },
  emailSettings = {
    baseURL: null,
    pageName: null
  },
  pinitSettings = {
    baseURL: "http://pinterest.com/pin/create/button/",
    pageName: "Pinterest"
  },

  /**
   * Construct a URL by combining a base URL with a parameter string.
   */
  _constructURL = function (baseURL, params) {
    var url = baseURL;
    var prefix = "?";
    var paramCount = 0;

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var encodedParam = encodeURIComponent(params[key]);

        if (paramCount > 0) {
          prefix = "&";
        }

        url = url + prefix + key + "=" + encodedParam;

        paramCount = paramCount + 1;
      }
    }

    return url;
  },

  _replaceSpace = function (str) {
    return str.replace(/\s+/g, '_');
  },

  setVal = function (data, objName) {

    var funkName = null;

    $.each(data, function (k, v) {
      if (v.name !== "funkName") {
        objName[v.name] = v.value;
      } else {
        funkName = v.value;
      }
    });

    return _replaceSpace(funkName);
  },

  buildEverything = function (obj, baseURL, ele, pageName, functionName, open) {
    var url = _constructURL(baseURL, obj),
      $demo = ele.find(".demo"),
      $markUp = ele.find(".lbi-markup"),
      $lbiLink = ele.find(".lbi-link"),
      baseFunction = null;

    if (open) {
      baseFunction = 'function(){window.open("' + url + '","' + pageName + '", "' + windowOptions + '");}';
    } else {
      baseFunction = 'function(){window.location="mailto:?subject=' + encodeURIComponent(obj.subject) + '&body=' + encodeURIComponent(obj.message) + '"};';
    };

    $demo.attr("href", "javascript:" + functionName + "(); javascript:void(0);");

    $markUp.attr("value", 'var ' + functionName + ' = ' + baseFunction + '');

    $lbiLink.attr("value", $demo.attr("href"));

    $("<script>").appendTo("body").html($markUp.val());

  },

  setUpLink = function (data, self, formId) {
    var socialOptions = formId + "Options",
      socialSettings = formId + "Settings",
      funkName = setVal(data, window[socialOptions]),
      popUp = formId !== "email" ? true : false;

    buildEverything(window[socialOptions], window[socialSettings].baseURL, self, window[socialSettings].pageName, funkName, popUp);
  };

$(document).on("submit", "form", function (event) {
  event.preventDefault();

  var self = $(this),
    data = self.serializeArray(),
    formId = self.attr("id");

  setUpLink(data, self, formId);

}).on("click", ".copy-js", function () {
  $(this).select();
}).foundation();

$(".accordion").append(html);