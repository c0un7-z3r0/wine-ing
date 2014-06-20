var WineForm = function (opts) {
	this.$template = $(opts.template);
	this.data = opts.data.ArrayList;
	this.otherData = opts.otherData.ArrayList;
	this.oderOfElemInForm = [ 'Name', 'Art', 'Region', 'Winzer', 'Typ', 'Preis' ];

};

WineForm.prototype.compileIt = function () {
	var $inputForm = $(this.$template.find('.inputForm').html());
	var $textbox = $inputForm.siblings('.textboxWrapper');
	var textboxTemplate = $textbox.html();
	$textbox.remove();
	var $dropdown = this.$template.find('.dropdownWrapper');
	var $newDropdown = $dropdown;
	$dropdown.remove();
	var dropdownTemplate = $dropdown.html();

	var that = this;

	var sortedObj = [];

	// sort the elements in the form according to the array
	// set in the beginning of the document
	$.each(this.oderOfElemInForm, function (k, v) {
		$.each(that.data, function (index, value) {
			if (v === value.name) {
				sortedObj.push(value);
			}
		});
	});

	// replace the placeholder
	$.each(sortedObj, function (index, item) {
		// if the obj doesnt have categories assume it is a input field
		// text
		if (typeof item.categories === 'undefined') {
			var text = '';
			if (typeof that.otherData !== 'undefined') {
				text = that.findInArray(that.otherData, item.name.toLowerCase());
			}
			var newTextBox = textboxTemplate.replace(/%%NAME%%/g,
				item.name);
			newTextBox = newTextBox.replace(/%%VALUE%%/g, text);
			var finsihedTextBox = $(newTextBox).removeClass('dummy').html();
			$inputForm.append(finsihedTextBox);
		}
		// otherwise it is a dropdown
		else {
			var $newDropdown = $(dropdownTemplate.replace(/%%NAME%%/g,
				item.name));

			$.each(item.categories, function (k, v) {
				$newDropdown.find('.actualDropdown').append(
					$('<option>', {
						value: v
					}).text(v));
			});
			if (typeof that.otherData !== 'undefined') {
				var selected = that.findInArray(that.otherData, item.name
					.toLowerCase());
				$newDropdown.find('.actualDropdown').find('option')
					.each(function (i, opt) {
						if (opt.value === selected)
							$(opt).attr('selected', 'selected');
					});
			}


			$inputForm.append($newDropdown);
		}

	});

	var newTemplate = this.$template;
	newTemplate.find('.inputForm').html($inputForm.html());
	newTemplate.find('.dummy').each(function () {
		this.remove();
	})
	if (typeof this.otherData !== 'undefined') {
		$.each(this.otherData, function (i, opt) {
			that.$template.find('.button.save').attr('onclick', 'WineIng.action.saveWine("' + opt.id + '")');
		});
	}
	return newTemplate;
};

/**
 * find the needle in a haystack and return the value
 * @param haystack
 * @param needle
 * @returns {String}
 */
WineForm.prototype.findInArray = function findInArray(haystack, needle) {
	var returnValue = '';
	$.each(haystack, function(key, value) {
		if (typeof value[needle] !== 'undefined') {
			returnValue = value[needle];
		}
	});
	return decodeURIComponent(returnValue);
}