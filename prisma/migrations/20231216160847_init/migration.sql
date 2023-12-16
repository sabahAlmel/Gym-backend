-- CreateTable
CREATE TABLE "Categories" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prodName" TEXT NOT NULL,
    "prodPrice" INTEGER NOT NULL,
    "prodImage" TEXT NOT NULL,
    "prodCategoryId" INTEGER NOT NULL,
    "prodDescription" TEXT NOT NULL,
    CONSTRAINT "Product_prodCategoryId_fkey" FOREIGN KEY ("prodCategoryId") REFERENCES "Categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
