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
	var title = document.createElement("strong");
	title.innerHTML = options.title;
	toast.appendChild(title);
	var message = document.createElement("p");
	message.innerHTML = options.message;
	toast.appendChild(message);

	if (typeof options.position === "string") {
		var positionCss = Toastfire.defaults.settings.positions[options.position];
		for (var prop in positionCss) {
			if (positionCss.hasOwnProperty(prop)) {
				toast.style[prop] = positionCss[prop];
			}
		}
	} else if (typeof options.position === "object") {
		toast.style.top = options.position.y + "px";
		toast.style.left = options.position.x + "px";
	}

	document.body.appendChild(toast);

	// make a toast object
	var toastObj = {
		"element": toast,
		"options": options,
		"close": function close() {
			toastObj.element.remove();
			clearTimeout(toastObj.timeout);
			toastObj.element = null;
			toastObj.timeout = null;
			if (typeof toastObj.options.onClose === "function") {
				toastObj.options.onClose(toastObj);
			}
		}
	};

	// use the toast object in various ways
	if (options.timeout) {
		toastObj.timeout = setTimeout(toastObj.close, options.timeout);
	}

	return toastObj;
};

// static defaults object
Toastfire.defaults = {
	"title": null,
	"message": null,
	"type": "default",
	"timeout": 5000,
	"onClose": null,
	"position": "top-right",
	"settings": {
		"positions": {
			"top-left": {
				"top": "0.5em",
				"left": "0.5em"
			},
			"top-middle": {
				"top": "0.5em",
				"left": "50%",
				"transform": "translateX(-50%)"
			},
			"top-right": {
				"top": "0.5em",
				"right": "0.5em"
			},
			"middle-left": {
				"top": "50%",
				"left": "0.5em",
				"transform": "translateY(-50%)"
			},
			"middle-middle": {
				"top": "50%",
				"left": "50%",
				"transform": "translate(-50%,-50%)"
			},
			"middle-right": {
				"top": "50%",
				"right": "0.5em",
				"transform": "translateY(-50%)"
			},
			"bottom-left": {
				"bottom": "0.5em",
				"left": "0.5em"
			},
			"bottom-middle": {
				"bottom": "0.5em",
				"left": "50%",
				"transform": "translateX(-50%)"
			},
			"bottom-right": {
				"bottom": "0.5em",
				"right": "0.5em"
			}
		}
	}
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

console.log("Toastfire loaded!");