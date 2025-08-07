# Contribution guidelines

1. Naming conventions: For more format guidelines, see the prettier and biome configuration.
   1. Variables: Camel
   2. Classes: Pascal
   3. Types: Pascal
   4. Files: Snake
2. Each test has a afterAll hook that attempts to clean up all test data provided the test passed
3. All helper functions comes with proper js-doc
4. Avoiding arbitrary waits in test by using the global system wait which mandates a detailed reason
