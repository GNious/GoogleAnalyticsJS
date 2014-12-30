.pragma library


/***************************************************************************************************
Google Analytics

Measurement Protocol Overview - https://developers.google.com/analytics/devguides/collection/protocol/v1/
Developer Guide - https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
Parameter Reference Guide - https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
Protocol Policy - https://developers.google.com/analytics/devguides/collection/protocol/policy
***************************************************************************************************/

var debug = 0;

var analyticsVersion = 1;
var propertyID = "";
//var trackingID ="";
var clientID ;
var appName;
var appVersion = "0.1a";
var appID;

// Advanced Parameters
var deviceScreen;


/*
v=1                        // Version.
&tid=UA-XXXX-Y             // Tracking ID / Property ID.
&cid=555                   // Anonymous Client ID.

&t=screenview              // Screenview hit type.
&an=funTimes               // App name.
&av=4.2.0                  // App version.
&aid=com.foo.App           // App Id.
&aiid=com.android.vending  // App Installer Id.

&cd=Home                   // Screen name / content description.
*/

function register( trackingID_in, clientID_in, appName_in, appVersion_in, appID_in )
{
	analyticsVersion = 1;
	propertyID = trackingID_in;
	clientID = clientID_in;
	appName = appName_in;
	appVersion = appVersion_in;
	appID = appID_in;

}
function registerAdditionSettings( parameter, value )
{
	if(parameter == "screenres")
		deviceScreen = value;
}
function appstart( )
{
	if(!isInitialized())
		return FALSE;

	var params =	"&sc=start";


	callGoogleAnalytics( params );
}
function appstop( )
{
	if(!isInitialized())
		return FALSE;

	var params =	"&sc=end";


	callGoogleAnalytics( params );
}

function screenview( screenName, other)
{
	if(!isInitialized())
		return FALSE;

	var params = "&t=screenview"				// Type

	if(screenName != undefined)
		params = params + "&cd="+screenName;
	if(other != undefined)
		params = params + "&"+other;

//	if(appotherID != undefined)
//		params = params + "&"+other;

	callGoogleAnalytics( params );
}

function event( action, category, value, label)
{
	if(!isInitialized())
		return FALSE;

	var params = "&t=event"				// Type

	if(action != undefined)
		params = params + "&ea="+action;
	if(category != undefined)
		params = params + "&ec="+category;
	if(value != undefined)
	{
		if(isInt(value))
		{
			if(value > 0)
				params = params + "&ev="+value;
		}
	}
	if(label != undefined)
		params = params + "&el="+label;

	callGoogleAnalytics( params );
}

function exception( exceptiondescription, fatal)
{
	if(!isInitialized())
		return FALSE;

	var params = "&t=exception"				// Type

	if(exceptiondescription != undefined)
		params = params + "&exd="+exceptiondescription;
	if(category != undefined)
		params = params + "&exf="+fatal;
	else
		params = params + "&exf=0";
	

	callGoogleAnalytics( params );
}

function callGoogleAnalytics( params )
{
	var http = new XMLHttpRequest();								// This is used for sending our call
	var url = "https://ssl.google-analytics.com/collect";			// Destination URL

	params =		"v=1" +							// API Version
					"&tid=" + propertyID +			// Analytics code
					"&cid=" + clientID +			// Unique ID (Device/User)
					//"&t=screenview" +				// Type
					"&an=" + appName +				// Application Name
					"&av=" + appVersion + params;	// Application Version and rest of Parameters

	if(appID != undefined)
		params = params + "&aid="+appID;
	if(deviceScreen != undefined)
		params = params + "&sr="+deviceScreen;

	http.open("POST", url, true);									// Use POST for more efficient transmission, per Google

	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");		//
	http.setRequestHeader("Content-length", params.length);							//
	http.setRequestHeader("Connection", "close");									//

	http.onreadystatechange = function()											// Call function when the state changes.
	{
		if(http.readyState == 4 && http.status == 200)								// If success
		{
			if(debug)
				console.log("Analytics replied: state="+http.readyState+" - status="+http.statusText+"("+http.status+")");
		}
	}

	if(debug)
		console.log("Analytics prepped: "+url+"?"+params);							// Log the call (in GET format) for debuggin'
	http.send(params);																// Make the call
	if(debug)
		console.log("Analytics sent ");												// Debug
}

function isInitialized()
{
	return !(propertyID === undefined || clientID === undefined || appName === undefined);
}
