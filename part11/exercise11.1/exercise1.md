## Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

- Linting: Checkstyle is a development tool to help programmers write Java code that adheres to a coding standard. It automates the process of checking Java code to spare humans of this boring (but important) task.
- Unit-testing: JUnit is a unit testing open-source framework for the Java programming language. Java Developers use this framework to write and execute automated tests.
- Integration-testing: an integration test can use real containers and real DBs as well as special Java integration testing frameworks (e.g. Arquillian or DbUnit). The mission of the Arquillian project is to provide a simple test harness that developers can use to produce a broad range of integration tests for their Java applications (most likely enterprise applications). A test case may be executed within the container, deployed alongside the code under test, or by coordinating with the container, acting as a client to the deployed code.
- Build: Gradle, Apache Maven, CMake, Sonatype Nexus, and Bazel are the most popular tools in the category "Java Build Tools". "Flexibility" is the primary reason developers pick Gradle over its competitors. It controls the development process in the tasks of compilation and packaging to testing, deployment, and publishing.

<hr>

## What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

Other CI/CD tools for web development include Buddy, TeamCity, GoCD, Bamboo, GitLab CI, CircleCI, Codeship, etc.

<hr>

## Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

The decision will be based on the project complecity and size.
A small sized project with relatively low complexity might work well with cloud-based solutions, that provide a good environment for most cases where "normal" solutions can cover the project needs.
On the other hand, for big and complex projects that might require specific solutions, a self-hosted environment could provide more flexibility and adapted options.
