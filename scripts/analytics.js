import "autotrack";

if (typeof ga != "undefined") {
  ga("create", "UA-XXXXXX-1", "auto");

  ga("require", "linkid");

  // Only require the plugins you've imported above.
  ga("require", "eventTracker");
  ga("require", "outboundLinkTracker");
  ga("require", "mediaQueryTracker");
  ga("require", "maxScrollTracker");
  ga("require", "pageVisibilityTracker");

  ga("send", "pageview");
}
