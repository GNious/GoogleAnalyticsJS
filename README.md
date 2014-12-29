GoogleAnalyticsJS
========

<p>3rd-party Javascript Library for sending events to <strong>Google Analytics</strong> from <strong>QML/QtQuick</strong>-based applications.</p>

<p>This is designed and implemented for the purpose of including in QML/QtQuick applications, but should be fully usable in other scenarios.</p>

<p>Requires a <em>Property-ID</em> (or <em>Tracking-ID</em>) from Google Analytics. Without this, you cannot track events. Register for a Property-ID on Google Analytics website.</p>

<p>An anonymous <em>Client/Device ID</em> is used to track events across multiple runs on a single device, but is not stored by the Library. Applications have to generate an ID on the first run, and store it for later access. The Library itself has no way to use the same Client ID across multiple applications, or across multiple devices.<br/>
Note: Google requires the Client ID to be anonymous, and not able to identify e.g. a specific user or device. Do NOT use IMAC or similar as Client ID.</p>


========

Measurement Protocol Overview - https://developers.google.com/analytics/devguides/collection/protocol/v1/
Developer Guide - https://developers.google.com/analytics/devguides/collection/protocol/v1/devguide
Parameter Reference Guide - https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
Protocol Policy - https://developers.google.com/analytics/devguides/collection/protocol/policy

========

<pre>function register( trackingID_in, clientID_in, appName_in, appVersion_in, appID_in )</pre>
Sets the <em>Tracking-ID</em> (Property ID), <em>Client/Device ID</em>, <em>Application Name</em>, <em>Application Version</em>, and <em>Application ID</em>. Must be called prior to calling any other function.<br/>
<em>Mandatory</em>


<p><pre>function registerAdditionSettings( parameter, value )</pre>
Registers additional (non-critical) parameters, that can be sent along with tracking events:<br/>
	"screenres" - Device screen-resolution, as WxH<br/>
<em>Optional</em></p>


<p><pre>function isInitialized()</pre>
returns true if register() has been successfully called.<br/>
<em>Internal</em></p>


<p><pre>function appstart( )</pre>
Sends event to Google Analytics signalling that the application has been started. Should only be used once, right after calling register()<br/>
<em>Optional, Recommended</em></p>


<p><pre>function appstop( )</pre>
Sends event to Google Analytics signalling that the application is stopping. <br/>
<em>Optional, Recommended</em></p>


<p><pre>function screenview( screenName, other)</pre>
Sends event that a new Screen/UI is being shown.<br/>
Recommended to include ScreenName, but not required.<br/> 
Can include Other options, based on the Google Analytics api paramenters, in the form of <paramter>=<value> pairs, separated by "&" (Ampersand)<br/>
<em>Optional</em></p>


<p><pre>function callGoogleAnalytics( params )</pre>
Internal function for sending event-data to Google Analytics.<br/>
<em>Should not be called directly by applications</em></p>
