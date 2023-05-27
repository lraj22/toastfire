# Toastfire

## What is Toastfire?

Toastfire is a JavaScript toast library by [lraj22](https://github.com/lraj22). Clean, simple, and customizable!

View the demonstration and try it out at [our demo site](https://lraj22.github.io/toastfire/).

## Usage

After importing the JS and CSS distribution files into your website, you can fire a simple toast with one line.

```js
Toastfire.toast("Hello world!");
```

To set options, pass an object instead of a string.

```js
Toastfire.toast({
	title: "Welcome to Toastfire!",
	message: "This is a custom defined toast.",
	timeout: 3000,
	showClose: false
});
```

If you want to define a preset (default settings), instantiate the `Toastfire` class.

```js
var UserInformer = new Toastfire({
	timeout: 0, // does not time out
	position: "bottom-middle",
	type: "info"
});

UserInformer.toast("Hi! This was made from a preset.");
UserInformer.toast({
	title: "Stacking works too!",
	message: "A message just for you",
	timeout: 10000 // local override
});
```
## Default Options

There are some base defaults that are applied if no option has been directly set. They can be edited through the `Toastfire.defaults` object, but that is discouraged. Making a preset is preferred over directly editing.

```js
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
```

## Issues, Contributions, & Feature requests

If you find a bug in the library, don't hesitate to post an issue.

Contributions are welcome! The goal is to keep a balance between performance and features (while maintaining ease of use), so make sure new features are optimized.

If you'd like to request a feature, you can open an issue. However, to satisfy the performance requirement, not all features will be implemented. We do accept suggestions!
