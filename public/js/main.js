$(document).ready(function() {
	console.log('Loaded...');
	var currentRecord;
	$.ajax('/api/resumes', {
		complete : function(response) {
			var callBack = response.responseJSON[0];   // saving callBack * * 
			currentRecord = callBack.id;

			var first = callBack.name_first;   // LOGGING NAME *
			var last = callBack.name_last;
			var fullName = first + ' ' + last; 
			$('#name').html(fullName);

			console.log(callBack);   // LOGGING JSON response obj *

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

			var skill1 = callBack.skill[0].title;     // SKILLS *
			var skill2 = callBack.skill[1].title;
			var skill3 = callBack.skill[2].title;
			$('#skill1').html(skill1);
			$('#skill2').html(skill2);
			$('#skill3').html(skill3);

			var exp1 = callBack.experience[0].organization; // EXPERIENCES * 
			var exp2 = callBack.experience[1].organization;
			$('#exp1').html(exp1);
			$('#exp2').html(exp2);
		}
	});
	$('#delete').click(function(){
		console.log(currentRecord);
		$.ajax({url : 'api/resumes/' + currentRecord,
				type : 'DELETE',
				success : function(result){
					console.log('Deleted : ' + currentRecord);
				}
		});

		return false;
	});

	$('#shoutForm').submit(function(event){
		console.log(event);
		var input = $('#sbInput').val();
		$('#display').append(input);
		$('#display').append(' ');
		$('#display').append('<br>');
		$('#sbInput').val('');
		console.log(input + ' = Success!');
		return false;
	});

	$('#add_form').submit(function(){           // UPON CLICKING SUBMIT ***
		var userData = {};

		userData.contact_info = {};
		userData.contact_info.email = $('#add_email').val();
		userData.contact_info.phone = $('#add_phone').val();

		address = {};
		address.city = $('#add_city').val();
		address.state = $('#add_state').val();
		address.street = $('#add_street').val();
		address.zip = $('#add_zip').val();
		userData.contact_info.street_address = address;

		userData.name_first = $('#add_nameFirst').val();
		userData.name_last = $('#add_nameLast').val();
		userData.schools = [];
		userData.schools[0] = {};
		userData.schools[0].name = $('#add_school').val();
		userData.experience = [];
		userData.experience[0] = {};
		userData.experience[0].organization = $('#add_employer').val();
		console.log(userData);

		$.ajax({url:'api/resumes',     // AJAX POST REQUEST *
				type:'POST',
				data: JSON.stringify({'resume' : userData})
		}); 


		return false;
		
	});
});





