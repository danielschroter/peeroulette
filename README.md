# peeroulette frontend application

peeroulette app based on React. Backend can be found [here](https://gitlab.lrz.de/seba-master-2021/team-50/frontend)

## Prerequisites

Both for the frontend and the backend:

-   nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

## Getting Started

To get you started you can simply clone the [peeroulette frontend](https://gitlab.lrz.de/seba-master-2021/team-50/frontend) repository and install all its dependencies:

### Prerequisites

You need git to clone the [peeroulette frontend](https://gitlab.lrz.de/seba-master-2021/team-50/frontend) repository. You can get git from [http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test [peeroulette frontend](https://gitlab.lrz.de/seba-master-2021/team-50/frontend) . You must have node.js and its package manager (npm) installed. You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone Peeroulette Project

Clone the [peeroulette frontend](https://gitlab.lrz.de/seba-master-2021/team-50/frontend) repository using [git](http://git-scm.com/):

```
git clone https://gitlab.lrz.de/seba-master-2021/team-50/frontend
cd frontend
```

### Install Dependencies

We get the tools we depend upon via `npm`, the [node package manager](https://www.npmjs.com).

```
npm install
```

### Create a Bundle for the Application

This project use [webpack](https://github.com/webpack/webpack) version 1 for creating a bundle of the application and its dependencies

We have pre-configured `npm` to automatically run `webpack` so we can simply do:

```
npm run build
```

Behind the scenes this will call `webpack --config webpack.config.js `. After, you should find that you have one new folder in your project.

-   `dist` - contains all the files of your application and their dependencies.

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:3000`.
