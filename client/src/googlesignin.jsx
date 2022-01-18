import { Component } from 'preact';

const CLIENT_ID = "464057583550-86mqvj5digb1fdlb6jpmmnimi4s2e0f0.apps.googleusercontent.com";

export default class GoogleSignInButton extends Component {
	
	async componentDidMount() {
		await import('https://apis.google.com/js/platform.js');

		const gapi = window.gapi;

		// var googleUser = {};
		// var startApp = function() {
		// 	gapi.load('auth2', function(){
		// 	// Retrieve the singleton for the GoogleAuth library and set up the client.
		// 	auth2 = gapi.auth2.init({
		// 		client_id: '',
		// 		cookiepolicy: 'single_host_origin',
		// 		// Request scopes in addition to 'profile' and 'email'
		// 		//scope: 'additional_scope'
		// 	});
		// 	attachSignin(document.getElementById('customBtn'));
		// 	});
		// };
	}

	render = () => (
		<>
			<meta name="google-signin-client_id" content={CLIENT_ID} />
			<div class="g-signin2 btn-sign-in" data-onsuccess="onSignIn" />
		</>
	);

	
}


// export async function() {
// 	await import('https://apis.google.com/js/platform.js');

// 	const gapi = window.gapi;

// 	var googleUser = {};
// 	var startApp = function() {
// 		gapi.load('auth2', function(){
// 		// Retrieve the singleton for the GoogleAuth library and set up the client.
// 		auth2 = gapi.auth2.init({
// 			client_id: '464057583550-86mqvj5digb1fdlb6jpmmnimi4s2e0f0.apps.googleusercontent.com',
// 			cookiepolicy: 'single_host_origin',
// 			// Request scopes in addition to 'profile' and 'email'
// 			//scope: 'additional_scope'
// 		});
// 		attachSignin(document.getElementById('customBtn'));
// 		});
// 	};

// 	function attachSignin(element) {
// 		console.log(element.id);
// 		auth2.attachClickHandler(element, {},
// 			function(googleUser) {
// 			document.getElementById('name').innerText = "Signed in: " +
// 				googleUser.getBasicProfile().getName();
// 				window.location.href="avatar_making.jsx";
// 			}, function(error) {
// 			alert(JSON.stringify(error, undefined, 2));
// 			window.location.href="login.html";
// 			});
// 	}

// 	if (auth2.isSignedIn.get()) {
// 		var profile = auth2.currentUser.get().getBasicProfile();
// 		let id = profile.getId();
// 		let name = profile.getName();
// 	}
// }
// // }



// //   function getName(){
// //       return(this.name);
// //   }
// //   startApp();