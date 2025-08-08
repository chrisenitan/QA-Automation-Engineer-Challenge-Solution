# Contribution guidelines

1. Naming conventions: For more format guidelines, see the prettier and biome configuration.
   1. Variables: camelCase
   2. Classes: PascalCase
   3. Types: PascalCase
   4. Files & Folders: Snake_Case
2. All helper functions comes with proper js-doc
3. Avoiding arbitrary waits in test by using the global system wait which mandates a detailed reason
4. All API assertions ultimately include a computation via Playwrights default assertion solution, to maintain proper test exists.
