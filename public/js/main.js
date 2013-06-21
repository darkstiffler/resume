$(document).ready(function() {
	console.log('Doc. Ready!');
	$.ajax('/api/resumes/51c2098b9d8045c5d2000001', {
		complete : function(response) {
			var callBack = response.responseJSON;   // saving callBack * * 

			var first = callBack.name_first;   // LOGGING NAME *
			var last = callBack.name_last;
			var fullName = first + ' ' + last; 
			$('#name').html(fullName);

			console.log(callBack);   // LOGGING JSON response *

			var email = callBack.contact_info.email;   // CONTACT INFO *
			var phone = callBack.contact_info.phone;
			var street = callBack.contact_info.street_address.street;
			var city = callBack.contact_info.street_address.city;
			var state = callBack.contact_info.street_address.state;
			var zip = callBack.contact_info.street_address.zip_code;
			var cityStateZip = city + ', ' + state + ' ' + zip;
			$('#cityStateZip').html(cityStateZip);
 			$('#email').html(email);
			$('#street').html(street);
			$('#phone').html(phone);

			var school1 = callBack.schools[0].name; // EDUCATION *
			var school2 = callBack.schools[1].name;
			var school3 = callBack.schools[2].name;
			$('#school1').html(school1);
			$('#school2').html(school2);
			$('#school3').html(school3);

			var skill1 = callBack.skill[0].title;
			var skill2 = callBack.skill[1].title;
			var skill3 = callBack.skill[2].title;
			$('#skill1').html(skill1);
			$('#skill2').html(skill2);
			$('#skill3').html(skill3);

			var exp1 = callBack.experience[0].organization;
			var exp2 = callBack.experience[1].organization;
			$('#exp1').html(exp1);
			$('#exp2').html(exp2);



		}
	});
});