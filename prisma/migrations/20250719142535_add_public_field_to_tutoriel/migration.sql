-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tutoriel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "description" TEXT,
    "fichier" TEXT NOT NULL,
    "categorie" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tutoriel" ("categorie", "createdAt", "description", "fichier", "format", "id", "titre") SELECT "categorie", "createdAt", "description", "fichier", "format", "id", "titre" FROM "Tutoriel";
DROP TABLE "Tutoriel";
ALTER TABLE "new_Tutoriel" RENAME TO "Tutoriel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
