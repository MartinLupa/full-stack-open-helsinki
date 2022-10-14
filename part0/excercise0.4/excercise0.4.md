## Done in websequencediagrams.com | Copy and paste to recreate

title part0 - Excercise 0.4: New note over

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
browser->server: Payload: text | note: "This is a new note"
note over server:
server receives the input data from the form
in the request body and executes the code to
add a new note
end note

server-->browser: HTTP Redirection | Headers: {Location: /notes}

note over server:
server sends status 302 of redirect to reload the
page so the new note is rendered. This redirection
implies that HTML, CSS and JS are requested again
as in the begining of the diagram.
end note

note over browser:
browser initializes HTTP GET to /notes
