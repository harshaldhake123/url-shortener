-- CreateTable
CREATE TABLE "public"."UrlMapping" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortCode" VARCHAR(20),
    "createdDateTimeUtc" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UrlMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UrlMapping_shortCode_key" ON "public"."UrlMapping"("shortCode");
