document.addEventListener("submit", function(event) {
    // Inform the background script that a form has been submitted
    if(event.target.tagName.toLowerCase() === "form") {
      chrome.runtime.sendMessage({ message: "formSubmit" });
    }
    console.log("event.target.tagName.toLowerCase()", event.target.tagName.toLowerCase());
});

chrome.runtime.onMessage.addListener( function(request, sender) {
  console.log("request", request);
  const req = request;
  
  console.log("email", req.email);
  autofill(req);
  console.log("Contentscript has received a message from background script: '" + request.toString() + "'");
});