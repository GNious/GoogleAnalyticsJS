GoogleAnalyticsJS
========

3rd-party Javascript Library for sending events to Google Analytics from QML/QtQuick-based applications.

This is designed and implemented for the purpose of including in QML/QtQuick applications, but should be fully usable in other scenarios.

Requires a Property-ID (or Tracking-ID) from Google Analytics. Without this, you cannot track events. Register for a Property-ID on Google Analytics website.

An anonymous Client/Device ID is used to track events across multiple runs on a single device, but is not stored by the Library. Applications have to generate an ID on the first run, and store it for later access. The Library itself has no way to use the same Client ID across multiple applications, or across multiple devices.
Note: Google requires the Client ID to be anonymous, and not able to identify e.g. a specific user or device. Do NOT use IMAC or similar as Client ID.


<pre>function register( trackingID_in, clientID_in, appName_in, appVersion_in, appID_in )</pre>
Sets the Tracking-ID (Property ID), Client/Device ID, Application Name, Application Version and Application ID. Must be called prior to calling any other function.
<em>Mandatory</em>


<pre>function registerAdditionSettings( parameter, value )</pre>
Registers additional (non-critical) parameters, that can be sent along with tracking events:
	"screenres" - Device screen-resolution, as WxH
<em>Optional</em>


<pre>function isInitialized()</pre>
returns true if register() has been successfully called.
<em>Internal</em>


<pre>function appstart( )</pre>
Sends event to Google Analytics signalling that the application has been started. Should only be used once, right after calling register()
<em>Optional, Recommended</em>


<pre>function appstop( )</pre>
Sends event to Google Analytics signalling that the application is stopping. 
<em>Optional, Recommended</em>


<pre>function screenview( screenName, other)</pre>
Sends event that a new Screen/UI is being shown.
Recommended to include ScreenName, but not required. 
Can include Other options, based on the Google Analytics api paramenters, in the form of <paramter>=<value> pairs, separated by "&" (Ampersand)
<em>Optional</em>


<pre>function callGoogleAnalytics( params )</pre>
Internal function for sending event-data to Google Analytics.
<em>Should not be called directly by applications</em>
