-- CreateTable
CREATE TABLE "Tutoriel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "description" TEXT,
    "fichier" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
