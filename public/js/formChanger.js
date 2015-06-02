$(".category").change(function(){

			var bookForm = $('#books');
			var elecForm = $('#electronics');
			var furnForm = $('#furniture');
			var subButn = $('#submit');

			var catValue = document.getElementById("category");
			var selection = catValue.options[catValue.selectedIndex].value;

			if( selection == "0" ){
				bookForm.hide();
				elecForm.hide();
				furnForm.hide();
				subButn.hide();

			}else {
				subButn.show();
				if( selection == "books"){
					bookForm.show();
					furnForm.hide();
					elecForm.hide();
				}else if( selection == "electronics"){
					elecForm.show();
					bookForm.hide();
					furnForm.hide();
				}else
				{
					furnForm.show();
					bookForm.hide();
					elecForm.hide();
				}
			}
		});

