# REST demo: React frontend
A simple demonstration of a REST client UI in React.

This repository implements a REST client application for managing a simple database of bookmarks. Each bookmark
consists of a name (the link text) and the URL that it should link to.  

This repository is part of my REST API demonstration project.  For more information on this project, including a list
of all available frontends and backends, please visit the following repo:
* [rest-demo](https://github.com/bmarcotte/rest-demo/)

## Installation and Deployment

There are configuration files in this repository to support installing and deploying this code through two different
methods.  Following the instructions for any one of these methods should setup a local running instance of this
application.

### Method 1: Using Docker & docker-compose (preferred)

The easiest way to try out the code in this repository is via the docker-compose method described in the README for the
main rest-demo project:
* [README.md: Method 1: Using Docker & docker-compose (preferred)](https://github.com/bmarcotte/rest-demo/blob/master/README.md#method-1-using-docker--docker-compose-preferred)

To request this frontend specifically, make sure your docker-compose command is prefixed with `FRONTEND=react`, like so:
```
> FRONTEND=react docker-compose up -d --build
```

For more details, please see the "Method 1" section in the README link above.

### Method 2: Using Docker without docker-compose

Requirements:
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - version 1.7.10 or later recommended
* [Docker](https://www.docker.com/get-docker) - version 17.05 or later

This method will build a Docker image for this application, and then create and run a container instance based on it.

Run the following commands to use this method:
```
> docker build -t frontend:deploy https://github.com/bmarcotte/rest-demo-react-frontend.git
> docker run --link bookmarkapi --name frontend -p 3000:3000 -d frontend:deploy
```

Note: The commands above assume that one of the REST demo backends is already up and running in Docker, in a
container named `bookmarkapi`, with port 8080 mapped.
Please see the [Backend(s)](https://github.com/bmarcotte/rest-demo#backends) section of the main rest-demo project
README for more information.

### Method 3: Using node and npm

Requirements:
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - version 1.7.10 or later recommended
* [node](https://nodejs.org/en/download/) - version 6.12 or later
* [npm](https://www.npmjs.com/get-npm) - version 5.6 or later

If Docker is not available, you can try manually building and installing the application via this method.

Run the following commands to use this method:
```
git clone https://github.com/bmarcotte/rest-demo-react-frontend.git
cd rest-demo-react-frontend
npm install
npm run start-dev
```

## Testing

Requirements:
* [npm](https://www.npmjs.com/get-npm) - version 5.6 or later

This repository includes a simple test suite that can be invoked with the following command:

```
CI=true npm test
```

For details on how to do more extensive functional endpoint testing of the backend web services, please see the
following documentation in my [rest-demo](https://github.com/bmarcotte/rest-demo) project repository:
* [TESTING.md](https://github.com/bmarcotte/rest-demo/blob/master/TESTING.md)

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Author

* **Ben Marcotte** - [bmarcotte](https://github.com/bmarcotte)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
