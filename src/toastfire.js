// Toastfire
// A clean, simple, and customizable toast notification library!

function Toastfire(customDefaults) {
	if (typeof customDefaults === "string") {
		customDefaults = {
			"type": customDefaults
		};
	}
	this.defaults = Toastfire._helper.addObj(Toastfire.defaults, customDefaults);
}

// this method shows the toast
Toastfire.prototype.toast = function toast(options) {
	if (typeof options === "string") {
		options = {
			"message": options
		};
	}
	options = Toastfire._helper.addObj(this.defaults, options);

	// create toast
	var toast = document.createElement("div");
	toast.className = "toastfire toastfire-" + options.type;
	var content = document.createElement("div");
	content.className = "toastfire-content";
	var title = document.createElement("strong");
	title.innerHTML = options.title;
	content.appendChild(title);
	var message = document.createElement("p");
	message.innerHTML = options.message;
	content.appendChild(message);
	toast.appendChild(content);

	if (typeof options.position === "string") {
		var positionContainer = document.getElementById("toastfire-pos-" + options.position);
		if (positionContainer) {
			positionContainer.appendChild(toast);
		} else {
			positionContainer = document.createElement("div");
			positionContainer.id = "toastfire-pos-" + options.position;
			positionContainer.className = "toastfire-pos";
			document.body.appendChild(positionContainer);
			positionContainer.appendChild(toast);
		}
	} else if (typeof options.position === "object") {
		var positionCss = options.position;
		for (var prop in positionCss) {
			if (positionCss.hasOwnProperty(prop)) {
				toast.style[prop] = ((typeof positionCss[prop] === "number") ? (positionCss[prop] + "px") : positionCss[prop]);
			}
		}
	}

	if (typeof options.transitionIn === "string") {
		toast.classList.add("toastfire-transition-" + options.transitionIn);
	}

	if (Array.isArray(options.extraClasses)) {
		options.extraClasses.forEach(function (extraClass) {
			toast.classList.add(extraClass);
		});
	} else if (typeof options.extraClasses === "string") {
		toast.classList.add(options.extraClasses);
	}

	function removeFirstListener() {
		toast.classList.remove("toastfire-transition-" + options.transitionIn);
		toast.removeEventListener("animationend", removeFirstListener);
		if (typeof toastObj.options.onOpened === "function") {
			toastObj.options.onOpened(toastObj);
		}
	}
	toast.addEventListener("animationend", removeFirstListener);

	if (typeof toastObj.options.onOpening === "function") {
		toastObj.options.onOpening(toastObj);
	}

	// make a toast object
	var toastObj = {
		"element": toast,
		"options": options,
		"close": function close() {
			toast.classList.remove("toastfire-transition-" + options.transitionIn);
			if (toastObj.options.transitionOut === "none") {
				toast.remove();
			} else if (typeof toastObj.options.transitionOut === "string") {
				toast.classList.add("toastfire-transition-" + options.transitionOut);
			}
			toast.classList.add("toastfire-closing");
			toast.addEventListener("animationend", function () {
				toastObj.element = null;
				toast.remove();
				if (typeof toastObj.options.onClosed === "function") {
					toastObj.options.onClosed(toastObj);
				}
			});
			clearTimeout(toastObj.timeout);
			toastObj.timeout = null;
			if (typeof toastObj.options.onClosing === "function") {
				toastObj.options.onClosing(toastObj);
			}
		}
	};

	// use the toast object in various ways
	if (options.timeout) {
		toastObj.timeout = setTimeout(toastObj.close, options.timeout);
	}

	if (options.showClose) {
		toast.classList.add("toastfire-close-visible");
		var close = document.createElement("div");
		close.className = "toastfire-close";
		close.innerHTML = "&times;";
		toast.appendChild(close);
		close.addEventListener("click", function () {
			toastObj.close();
		});
	}

	return toastObj;
};

// static defaults object
Toastfire.defaults = {
	"title": null,
	"message": null,
	"type": "default",
	"timeout": 5000,
	"onOpening": null,
	"onOpened": null,
	"onClosing": null,
	"onClosed": null,
	"position": "top-right",
	"transitionIn": "fadeInUp",
	"transitionOut": "fadeOutDown",
	"showClose": true,
	"extraClasses": null
};

// wrapper function for basic toasting
Toastfire.toast = function toast(options) {
	return new Toastfire().toast(options);
};

// this will contain helper functions
Toastfire._helper = {};

// cloneObj function taken from https://stackoverflow.com/a/7574273
Toastfire._helper.cloneObj = function cloneObj(obj) {
	if (obj == null || typeof (obj) != 'object') {
		return obj;
	}

	var clone = new obj.constructor();
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			clone[key] = Toastfire._helper.cloneObj(obj[key]);
		}
	}

	return clone;
};

Toastfire._helper.addObj = function addObj(original, addme) {
	var combined = Toastfire._helper.cloneObj(original);
	if (typeof addme === "object") {
		for (var key in addme) {
			if (addme.hasOwnProperty(key)) {
				combined[key] = addme[key];
			}
		}
	}
	return combined;
};