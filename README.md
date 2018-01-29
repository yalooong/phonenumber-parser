# Phonenumber-parser

A simple RESTful api server built for parsing phone numbers from text or files by using google libphonenumber library.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Any operating systems with NodeJS installed and a working brawser.

```
NodeJS: https://nodejs.org/en/download/
Chrome: https://www.google.com/chrome/browser/desktop/index.html
```

### Installing

A step by step series of examples that tell you have to get a development env running

clone the repository to your local machine

```
git clone https://github.com/yalooong/phonenumber-parser.git
```

run the following command from phonenumber-parser root

```
npm install
node server.js
```

The server should be started on localhost:3000.

## Running the tests

Two APIs are accessable at:

GET /api/phonenumbers/parse/text/{...string...}
This will send back an array of numbers if the string contains any.

```
http://localhost:3000/api/phonenumbers/parse/text/anytextandnumber4168391029
```

POST http://localhost:3000/api/phonenumbers/parse/file
This allow you to upload a file, and parse the phone numbers within the file.

```
http://localhost:3000/api/phonenumbers/parse/file
```

To test the APIs.

```
npm test
```
## Built With

* [Express](https://expressjs.com/) - The web framework used
* [npm](https://maven.apache.org/) - Package Management for JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details